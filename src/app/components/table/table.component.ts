import { Component } from '@angular/core';
import { GetElementsService } from '../../services';
import { PeriodicElement } from '../../types';
import { debounceTime, finalize, tap } from 'rxjs';
import { Columns } from '../../constants/constants';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditRowComponent } from '../index';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  public loader: boolean = true;
  public columns: string[] =  Object.values(Columns);
  public searchInput: FormControl = new FormControl('');
  public filterElements: PeriodicElement[];
  private elements: PeriodicElement[];
  constructor(
    private getElements: GetElementsService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getData();
    this.searchEvent();
  }

  public editRow(element: PeriodicElement, index: number): void {
    const dialogRef = this.dialog.open(EditRowComponent, {
      data: element,
      width: "400px",
      height: "400px"
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(!!result){
        this.elements = [...this.filterElements.slice(0, index), result, ...this.filterElements.slice(index + 1)];
      this.filterElements = [...this.elements];
      }
    });
  }

  private getData(): void {
    this.getElements.get().pipe(
        tap((elements) => {
          this.elements = elements;
          this.filterElements = elements;
        }),
        finalize(() => {
          this.loader = false;
        })
      ).subscribe();
  }

  private searchEvent(): void {
    this.searchInput.valueChanges
      .pipe(
        tap(() => setTimeout(() => (this.loader = true), 1000)),
        debounceTime(2000)
      )
      .subscribe((searchValue) => {
        if(searchValue == "" ){
          this.filterElements = [...this.elements];
        }else{
          this.filterElements = this.filteredElements(searchValue);
        }
        this.loader = false;
      });
  }

  private filteredElements(searchValue: string): PeriodicElement[] {
    return this.elements.filter(
      (element) =>
        element.number == parseInt(searchValue) ||
        element.weight?.toString().startsWith(searchValue) ||
        element.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        element.symbol?.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
