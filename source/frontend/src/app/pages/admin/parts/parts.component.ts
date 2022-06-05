import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BurgerPartModel } from 'src/app/models/common/BurgerPartModel';
import { IDataColumn } from 'src/app/modules/data-components/models/DataTableModels';
import { BurgerPartService } from 'src/app/services/admin/BurgerPartsService';
import { BasePage } from '../../BasePage';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent extends BasePage implements OnInit {

  constructor(
    private partService: BurgerPartService,
    private router: Router
  ) { super() }

  parts$: Observable<BurgerPartModel[]> = this.partService.getAll();

  columns: IDataColumn[] = [
    { key: "name", title: "Name", sortable: true, filterable: false},
    { key: "category", title: "Category", sortable: true, filterable: false},
    { key: "status", title: "Status", sortable: true, filterable: false},
    { key: "price", title: "Price", sortable: true, filterable: false},
  ];

  filter: string = '{}';

  ngOnInit(): void {
  }

  onEditClick(item: BurgerPartModel) {
    this.router.navigate(['/', 'admin', 'part', item._id]);
  }

  onCreateClick() {
    this.router.navigate(['/', 'admin', 'part', 'new']);
  }

  onFilterChanged(filterJSON: string) {
    this.filter = filterJSON;
  }

}
