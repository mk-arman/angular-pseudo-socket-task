import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockWorkerUrl = 'mocked-worker.js';

  beforeEach(async () => {
    const workerUrlProvider = { provide: 'workerUrl', useValue: mockWorkerUrl };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, TableComponent],
      providers: [workerUrlProvider],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.elements).toEqual([]);
    expect(component.loading).toBeTruthy();
    expect(component.timer).toBe(300);
    expect(component.arraySize).toBe(1000);
  });

  it('should handle additionalIdsChange correctly with valid input', () => {
    const validAdditionalIds = '1, 2';
    const initialElements = [
      {
        id: '1',
        int: 1,
        float: 1,
        color: 'red',
        child: {
          id: '11',
          color: 'green',
        },
      },
      {
        id: '2',
        int: 2,
        float: 2,
        color: 'red',
        child: {
          id: '22',
          color: 'green',
        },
      },
    ];
    component.elements = initialElements.slice();

    component.additionalIdsChange(validAdditionalIds);

    expect(component.overwritingIds).toBe(false);
    expect(component.notValidAdditionalIds).toBe(false);

    const expectedUpdatedElements = [
      {
        id: '1',
        int: 1,
        float: 1,
        color: 'red',
        child: {
          id: '11',
          color: 'green',
        },
      },
      {
        id: '2',
        int: 2,
        float: 2,
        color: 'red',
        child: {
          id: '22',
          color: 'green',
        },
      },
    ]; 

    expect(component.elements).toEqual(expectedUpdatedElements);
  });
});
