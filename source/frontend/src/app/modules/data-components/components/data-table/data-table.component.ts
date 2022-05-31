import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IDataColumn } from '../../models/DataTableModels';

@Component({
  selector: 'dc-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<Model extends {[key: string] : any}> implements OnInit {
  constructor() { }

  @Input()
  columns: IDataColumn[] = [];

  @Input()
  items$: Observable<Model[]> = new Observable();

  @Input()
  editButton: boolean = false;
  
  @Output()
  editButtonClicked: EventEmitter<Model> = new EventEmitter<Model>();

  ngOnInit(): void {
  }

  onEditButtonClick(item: Model) {
    this.editButtonClicked.emit(item);
  }
}
