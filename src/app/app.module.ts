import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GetElementsService } from './services';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GetElementsServiceMock } from './mocks';
import { TableComponent } from './components';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule, 
    MatProgressSpinnerModule,
    MatIconModule, 
    MatButtonModule,
    CommonModule,
    BrowserModule,
  ],
  providers: [
    provideHttpClient(),
    provideClientHydration(),
    {provide: GetElementsService, useClass: GetElementsServiceMock}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
