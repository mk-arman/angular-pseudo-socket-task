import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IElement } from '../interfaces/IElement.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TableComponent {
  @Input() elements!: IElement[];

  trackByFn(index: number, item: IElement): string {
    return item.id;
  }
}
