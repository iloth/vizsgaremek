import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDataColumn, Displays } from '../../models/DataTableModels';

@Component({
  selector: 'dc-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<Entity extends {[key: string] : any}> implements OnInit {
  constructor() { }

  @Input()
  columns: IDataColumn[] = [];

  @Input()
  items: Entity[] | null = null;

  @Input()
  editButton: boolean = false;
  
  @Input()
  pager: boolean = true;
  currPage: number = 1;
  pageSize: number = environment.dataComponents.pager.defaultPageSize;

  @Input()
  sortable: boolean = true;
  sortKey: string | null = null;
  sortDirection: number = 1;

  @Output()
  editButtonClicked: EventEmitter<Entity> = new EventEmitter<Entity>();

  ngOnInit(): void {
  }

  //hack to use enum in template
  public get Displays() {
    return Displays; 
  }

  onEditButtonClick(item: Entity): void {
    this.editButtonClicked.emit(item);
  }

  currPageItems(): Entity[] | null {
    if (this.pager && this.sortedItems()) {
      return (this.sortedItems() ?? []).slice((this.currPage - 1) * this.pageSize, (this.currPage - 1) * this.pageSize + this.pageSize - 1)
    } else {
      return this.sortedItems();
    }
  }

  onChangePage(toPpage: number): void {
    this.currPage = toPpage;
  }

  sortedItems(): Entity[] | null {
    if (this.sortable && this.sortKey && this.items) {
      const key = this.sortKey ?? '';
      const sorted = [...this.items];
      const column = this.columns.find((col) => col.key === this.sortKey);
      const format = column?.format;

      sorted.sort( (a: Entity, b: Entity) => {
        if (typeof a[key] === 'number' && typeof b[key] === 'number') {
          return (a[key] - b[key]) * this.sortDirection;
        } else {
          return (
            ('' + format === null ? a[key] : (format ?? ((x: any)=> x))(a[key]))
              .toLowerCase()
              .localeCompare(
                ('' + format === null ? b[key] : (format ?? ((x: any)=> x))(b[key])).toLowerCase()
              )
            ) * this.sortDirection;
        }
      });
      return sorted;
    } else {
      return this.items;
    }
  }

  onSortClick(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection *= -1;
    } else {
      this.sortKey = key;
      this.sortDirection = 1;
    }
  }
}
