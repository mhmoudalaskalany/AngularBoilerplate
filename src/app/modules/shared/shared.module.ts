import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DeleteDialogComponent } from './components/data-table/components/Delete-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengModule } from '../primeng/primeng.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  entryComponents: [
    DeleteDialogComponent
  ],
  declarations: [
    DataTableComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    TranslateModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableComponent,
    PrimengModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class SharedModule { }
