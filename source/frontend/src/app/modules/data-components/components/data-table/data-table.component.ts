import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDataColumn, Displays } from '../../models/DataTableModels';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'dc-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<Entity extends {[key: string] : any}> implements OnInit {
  constructor(
    private ref: ChangeDetectorRef
  ) { }

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

  @Input()
  sortable: boolean = true;
  sortKey: string | null = null;
  sortDirection: number = 1;

  @Input()
  filterable: boolean = true;
  filters: Map<string, any> = new Map();
  filtersJSON: string = '{}';

  @Output()
  editButtonClick: EventEmitter<Entity> = new EventEmitter<Entity>();

  //#endregion properties

  ngOnInit(): void {
    this.columns.filter((col) => col.filterable).forEach((col) => {
      this.filters.set(col.key, null);
    })
  }

  //hack to use enum in template
  public get Displays() {
    return Displays; 
  }

  onEditButtonClick(item: Entity): void {
    this.editButtonClick.emit(item);
  }

  //#region paginating

  onChangePage(toPage: number): void {
    this.currPage = toPage;
  }
  //#endregion paginating

  //#region sorting

  onSortClick(key: string): void {
    if (this.sortKey === key) {
      this.sortDirection *= -1;
    } else {
      this.sortKey = key;
      this.sortDirection = 1;
    }
  }
  //#endregion sorting

  //#region filtering

  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filters.set(input.name, input.value);

    this.refreshFilter();
  }

  onFilterKeyup(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    this.filters.set(input.name, input.value);

    this.refreshFilter();
  }

  refreshFilter() {
    let filters: string[] = [];
    this.filters.forEach((val:string | null, key: string) => {
      if(val) {
        filters.push(`"${key}": "${val}"`);
      }
    })
    if (filters.length > 0)
      this.filtersJSON = '{' + filters.join(', ') + '}';
    else 
      this.filtersJSON = '{}';
  }

  onResetFilterButtonClick(): void {
    this.filters.forEach((value, key) => {
      this.filters.set(key, null);
    })
  }

  //#endregion filtering
}
