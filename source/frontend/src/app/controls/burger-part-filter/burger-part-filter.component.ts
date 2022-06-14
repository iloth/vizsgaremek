import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BurgerPartCategories, BurgerPartStatuses, BurgerPartVegetarian } from 'src/app/models/common/BurgerPartModel';

@Component({
  selector: 'app-burger-part-filter',
  templateUrl: './burger-part-filter.component.html',
  styleUrls: ['./burger-part-filter.component.scss']
})
export class BurgerPartFilterComponent implements OnInit {

  constructor() { }

  @Input()
  availableOnly: boolean = false;

  mainForm = new FormGroup({
    name: new FormControl(''),
    category: new FormControl(''),
    freeFrom: new FormControl([] as string[]),
    vegan: new FormControl(''),
    hot: new FormControl(null),
    status: new FormControl(this.availableOnly ? 'ok': ''),
  })

  freeFrom = {
    gluten: false, 
    lactose: false, 
    sugar: false
  }

  categories = Object.entries(BurgerPartCategories);
  statuses = Object.entries(BurgerPartStatuses);
  vegs = Object.entries(BurgerPartVegetarian);
  
  name: string = '';

  filtersJSON: string = '{}';

  @Output() 
  filterChanged: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }

  public control(path: string): FormControl {
    return this.mainForm.get(path) as FormControl;
  }
  
  onNameChange(event: Event) {
    const control = event.target as HTMLInputElement;

    this.mainForm.patchValue({
      name: control.value
    });
    this.onFormChange();
  }

  onFreeFromChange() {
    const freeFrom = [];
    if (this.freeFrom.gluten) freeFrom.push("gluten");
    if (this.freeFrom.lactose) freeFrom.push("lactose");
    if (this.freeFrom.sugar) freeFrom.push("sugar");
    
    this.mainForm.patchValue({
      freeFrom: [...freeFrom]
    });
    this.onFormChange();
  }

  onFormChange(): void {
    this.filtersJSON = JSON.stringify(this.mainForm.getRawValue());
    this.filterChanged.emit(this.filtersJSON);
  }
}
