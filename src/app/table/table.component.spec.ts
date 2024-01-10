import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { CommonModule } from '@angular/common';
import { IElement } from '../interfaces/IElement.interface';
import { By } from '@angular/platform-browser';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.elements = [];
    fixture.detectChanges();
  });

  it('should display elements in the table', () => {
    const testElements: IElement[] = [
      { id: '1', int: 10, float: 3.14, color: 'red', child: { id: 'child1', color: 'blue' } },
    ];

    component.elements = testElements;  
    fixture.detectChanges();

    const tableRows = fixture.debugElement.nativeElement.querySelectorAll('tbody tr');

    expect(tableRows.length).toBeGreaterThan(testElements.length);

    testElements.forEach((element, index) => {
      const row = tableRows[index];
      expect(row.cells[0].textContent).toContain(element.id);
      expect(row.cells[1].textContent).toContain(element.int);
    });
  });
 
  it('should display "No Elements" when elements array is empty', () => {
    component.elements = [];
    fixture.detectChanges();
  
    const element = fixture.debugElement.query(By.css('span[data-testid="no-value"]'));

    expect(element).toBeTruthy();
  });
});
