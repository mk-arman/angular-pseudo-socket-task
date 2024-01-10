import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getElements, NUMBERS_WITH_COMMAS_PATTERN } from './elements';
import { IElement } from './interfaces/IElement.interface';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, TableComponent],
})
export class AppComponent implements OnInit, OnDestroy {
  public elements: IElement[] = [];
  public loading: boolean = false;
  public timer: number = 300;
  public arraySize: number = 1000;
  public additionalArrayIds: any;
  public overwritingIds: boolean = false;
  public notValidAdditionalIds: boolean = false;

  private currentWorker!: Worker;

  public timerChange(timer: number): void {
    this.elements = [];
    this.timer = timer;

    if (timer <= 0) {
      this.terminateRunningWorker();
      return;
    }
    this.runCalculation();
  }

  public arraySizeChange(arraySize: number): void {
    this.elements = [];
    this.arraySize = arraySize;

    if (arraySize <= 0) {
      this.terminateRunningWorker();
      return;
    }
    this.runCalculation();
  }

  public additionalIdsChange(additionalArrayIds: string): void {
    this.overwritingIds = true;
    this.additionalArrayIds = additionalArrayIds;
    this.terminateRunningWorker();
  
    const arrayIds = additionalArrayIds.split(',').map((id) => id.trim());
  
    // Initialize elements array with default values if empty or insufficient
    if (!this.elements || this.elements.length < arrayIds.length) {
      this.elements = Array(arrayIds.length).fill({ id: '' });
    }
  
    // Update ids in elements array based on provided arrayIds
    for (let i = 0; i < arrayIds.length; i++) {
      if (arrayIds[i]) {
        this.elements[i].id = arrayIds[i];
      }
    }
  
    // Check for valid additionalArrayIds
    this.notValidAdditionalIds = !NUMBERS_WITH_COMMAS_PATTERN.test(this.additionalArrayIds);
  
    this.overwritingIds = false;
  }
  
  ngOnInit(): void {
    this.runCalculation();
  }

  ngOnDestroy(): void {
    this.terminateRunningWorker();
  }

  public runCalculation(): void {
    if (typeof Worker !== undefined) {
      this.terminateRunningWorker();
      this.invokeNewWorker(this.timer, this.arraySize);
    } else {
      console.error('Web workers not supported! Calling on main thread...');
      this.elements = getElements(this.arraySize);
    }
  }

  private invokeNewWorker(timer: number, arraySize: number): void {
    this.currentWorker = new Worker(
      new URL('./pseudo-socket.worker', import.meta.url)
    );
    this.loading = true;
    this.currentWorker.onmessage = ({ data }) => {
      this.elements = data.result.slice(-10);
      this.loading = false;
    };
    this.currentWorker.postMessage({ timer, arraySize });
  }

  private terminateRunningWorker(): void {
    this.currentWorker?.terminate();
    this.loading = false;
  }
}
