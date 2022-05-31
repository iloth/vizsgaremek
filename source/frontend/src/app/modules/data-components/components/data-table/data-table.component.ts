import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDataColumn, Displays } from '../../models/DataTableModels';

@Component({
  selector: 'dc-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<Entity extends {[key: string] : any}> implements OnInit {
  constructor() { }

  //#region properties
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
  pagedItems:  Entity[] | null = null;

  @Input()
  sortable: boolean = true;
  sortKey: string | null = null;
  sortDirection: number = 1;
  private sortedItems: Entity[] | null = null;

  @Input()
  filterable: boolean = true;
  filters: Map<string, any> = new Map();
  private filteredItems: Entity[] | null = null;

  @Output()
  editButtonClicked: EventEmitter<Entity> = new EventEmitter<Entity>();

  //#endregion properties

  ngOnInit(): void {
    this.columns.filter((col) => col.filterable).forEach((col) => {
      this.filters.set(col.key, null);
    })
    this.filterItems();
    this.sortItems();
    this.pageItems();
  }

  //hack to use enum in template
  public get Displays() {
    return Displays; 
  }

  onEditButtonClick(item: Entity): void {
    this.editButtonClicked.emit(item);
  }

  //#region paginating
  private pageItems(): void {
    this.pagedItems = [...this.sortedItems ?? []]
    if (this.pager && this.sortedItems) {
      this.pagedItems = (this.sortedItems ?? []).slice((this.currPage - 1) * this.pageSize, (this.currPage - 1) * this.pageSize + this.pageSize - 1)
    }
  }

  onChangePage(toPpage: number): void {
    this.currPage = toPpage;
    this.pageItems();
  }
  //#endregion paginating

  //#region sorting
  private sortItems(): void {
    this.sortedItems = [...this.filteredItems ?? []];
    if (this.sortable && this.sortKey && this.items) {
      const key = this.sortKey ?? '';
      const column = this.columns.find((col) => col.key === this.sortKey);
      const format = column?.format;

      this.sortedItems?.sort( (a: Entity, b: Entity) => {
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
    } 
  }

  onSortClick(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection *= -1;
    } else {
      this.sortKey = key;
      this.sortDirection = 1;
    }
    this.sortItems();
  }
  //#endregion sorting

  //#region filtering

  onFilterKeyup(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    this.filters.set(input.name, input.value);
  }

  onFilterButtonClick(): void {
    this.filterItems();
  }

  onResetFilterButtonClick(): void {
    this.filters.forEach((value, key) => {
      this.filters.set(key, null);
    })
  }

  private filterItems(): void {
    this.filteredItems = [...this.items ?? []];
    this.filters.forEach((value, key) => {
      if (value) {
        this.filteredItems?.filter((item) => ('' + item[key]).toLowerCase().includes(value.toLowerCase()))        
      }
    });
  }

  //#endregion filtering
}
