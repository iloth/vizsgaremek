import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PagerComponent } from './components/pager/pager.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { PagePipe } from './pipes/page.pipe';



@NgModule({
  declarations: [
    DataTableComponent,
    PagerComponent,
    FilterPipe,
    SortPipe,
    PagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DataTableComponent,
    PagerComponent,
    FilterPipe,
    SortPipe,
    PagePipe
  ]
})
export class DataComponentsModule { }
