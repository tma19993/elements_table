import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PeriodicElement } from '../../types';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Columns } from '../../constants/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-row',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './edit-row.component.html',
  styleUrl: './edit-row.component.scss',
})
export class EditRowComponent {
  public columnsArray: string[] =  Object.values(Columns);
  public form: FormGroup;
  public columnNames: typeof Columns = Columns;

  constructor(
    public dialog: MatDialogRef<EditRowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      number: [this.data.number, [Validators.required,Validators.min(0)]],
      name: [this.data.name, Validators.required],
      weight: [this.data.weight, [Validators.required,Validators.min(0)]],
      symbol: [this.data.symbol, Validators.required],
    });
  }

  public onSubmit() {
    if (this.form.valid) {
      const updatedElement: PeriodicElement = {
        number: +this.form.value.number,
        name: this.form.value.name,
        weight: +this.form.value.weight,
        symbol: this.form.value.symbol
      }
      this.dialog.close(updatedElement);
    }
  }

  public onClose(): void {
    this.dialog.close();
  }
}
