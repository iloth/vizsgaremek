import { Component, Input, OnInit } from '@angular/core';
import { BurgerPartModel } from 'src/app/models/common/BurgerPartModel';
import { IDataColumn } from 'src/app/modules/data-components/models/DataTableModels';

@Component({
  selector: 'app-burger-parts',
  templateUrl: './burger-parts.component.html',
  styleUrls: ['./burger-parts.component.scss']
})
export class BurgerPartsComponent implements OnInit {
  constructor() { }

  @Input()
  items: BurgerPartModel[] | null = null

  columns: IDataColumn[] = [
    { key: "name", title: "Part", sortable: false, filterable: false },    
    { key: "category", title: "Category", sortable: false, filterable: false, },
    { key: "price", title: "Price", sortable: false, filterable: false, },
    { key: "defaultPlace", title: "Place", sortable: false, filterable: false }
  ];

  ngOnInit(): void {
  }

}
