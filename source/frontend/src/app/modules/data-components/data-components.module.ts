import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PagerComponent } from './components/pager/pager.component';



@NgModule({
  declarations: [
    DataTableComponent,
    PagerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DataTableComponent,
    PagerComponent
  ]
})
export class DataComponentsModule { }
