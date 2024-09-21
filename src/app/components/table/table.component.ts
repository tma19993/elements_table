import { Component } from '@angular/core';
import { GetElementsService } from '../../services';
import { ElementsState, PeriodicElement } from '../../types';
import { debounceTime, Observable, tap } from 'rxjs';
import { Columns } from '../../constants/constants';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditRowComponent } from '../index';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  public columns: string[] = Object.values(Columns);
  public searchInput: FormControl = new FormControl('');
  public loader$: Observable<boolean>;
  public filterElements$: Observable<PeriodicElement[]>;
  constructor(
    private getElements: GetElementsService,
    private dialog: MatDialog,
    private state: RxState<ElementsState>
  ) {
    this.setData();
  }

  public ngOnInit(): void {
    this.getData();
    this.setupSearchEvent();
  }

  public editRow(element: PeriodicElement, index: number): void {
    const dialogRef = this.dialog.open(EditRowComponent, {
      data: element,
      width: '400px',
      height: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.state.set(({ filteredElements,elements }) => ({
          filteredElements: [...filteredElements.slice(0, index), result, ...filteredElements.slice(index + 1)],
          elements: [...elements.slice(0, index), result, ...elements.slice(index + 1)],
        }));
      }
    });
  }

  private getData(): void {
    this.getElements.get()
      .pipe(tap((elements) => {this.state.set({elements, filteredElements: elements, loader: false})}))
      .subscribe();
  }

  private setData(): void {
    this.state.set({
      loader: true,
      search: '',
      elements: [],
      filteredElements: [],
    });
    this.loader$ = this.state.select('loader');
    this.filterElements$ = this.state.select('filteredElements');
  }

  private setupSearchEvent(): void {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(2000),
        tap((searchValue) => {
          this.state.set({ loader: true, search: searchValue });
        })
      )
      .subscribe((searchValue) => {
          this.state.set(({ elements }) => ({
            filteredElements: this.filteredElements(elements, searchValue),
            loader: false,
          }));
        
      });
  }

  private filteredElements(elements: PeriodicElement[], searchValue: string): PeriodicElement[] {
    if (!searchValue || searchValue.trim() === "") {
      return [...elements];  
    }
  
    return elements.filter(
      (element) =>
        element.number == parseInt(searchValue) ||
        element.weight?.toString().startsWith(searchValue) ||
        element.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
        element.symbol?.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
