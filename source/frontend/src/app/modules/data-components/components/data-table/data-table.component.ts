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
    if (this.pager && this.items) {
      return this.items?.slice((this.currPage - 1) * this.pageSize, (this.currPage - 1) * this.pageSize + this.pageSize - 1)
    } else {
      return this.items;
    }
  }

  onChangePage(toPpage: number): void {
    this.currPage = toPpage;
  }
}
