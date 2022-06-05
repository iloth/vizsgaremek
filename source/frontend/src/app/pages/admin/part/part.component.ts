import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { BurgerPartCategories, BurgerPartModel, BurgerPartStatuses, BurgerPartVegetarian } from 'src/app/models/common/BurgerPartModel';
import { EditModes } from 'src/app/models/common/EditModes';
import { BurgerPartService } from 'src/app/services/admin/BurgerPartsService';
import { BaseFormPage } from '../../BaseFormPage';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent extends BaseFormPage implements OnInit {

  constructor(
    private partService: BurgerPartService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { super(); }

  mainForm = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl(''),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    category: new FormControl('other', [Validators.required]),
    freeFrom: new FormControl([]),
    vegan: new FormControl('no'),
    hot: new FormControl(0, [Validators.required]),
    status: new FormControl('ok', [Validators.required]),
    defaultPlace: new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)])
  });

  freeFrom = {
    gluten: false, 
    lactose: false, 
    sugar: false
  }

  editMode: EditModes = EditModes.Create;

  categories = Object.entries(BurgerPartCategories);
  statuses = Object.entries(BurgerPartStatuses);
  vegs = Object.entries(BurgerPartVegetarian);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (!params['id'] || params['id'] === '' || params['id'] == 'new') {
        this.mainForm.patchValue(new BurgerPartModel());
        this.editMode = EditModes.Create;
      } else {
        this.partService.get(params['id']).subscribe(
          (partModel: BurgerPartModel) => {
            if (!partModel) {
              this.router.navigate(['/', '404'], {skipLocationChange: true});
            }
            
            this.editMode = EditModes.Edit;

            this.mainForm.patchValue(partModel);

            this.freeFrom.gluten = partModel.freeFrom.find((r) => r == 'gluten') != undefined;
            this.freeFrom.lactose = partModel.freeFrom.find((r) => r == 'lactose') != undefined;
            this.freeFrom.sugar = partModel.freeFrom.find((r) => r == 'sugar') != undefined;
          },
          (error: HttpErrorResponse) => {
            this.router.navigate(['/', 'error'], { skipLocationChange: true, queryParams: { error: JSON.stringify(error) } });            
          });
      }
    });    
  }

  onFreeFromChange() {
    const freeFrom = [];
    if (this.freeFrom.gluten) freeFrom.push("gluten");
    if (this.freeFrom.lactose) freeFrom.push("lactose");
    if (this.freeFrom.sugar) freeFrom.push("sugar");
    
    this.mainForm.patchValue({
      freeFrom: [...freeFrom]
    });
  }

  onSubmit() {
    const part: BurgerPartModel = { ...this.mainForm.value } as BurgerPartModel;

    if (this.editMode == EditModes.Create) {
      this.partService.create(part).subscribe((result: BurgerPartModel) => {
        console.log(result);
        this.router.navigate(['/', 'admin', 'part', result._id]);
      });
    } else {
      this.partService.update(part).subscribe((result: BurgerPartModel) => {
        var userSavedToast = document.getElementById('partSavedToast')
        var toast = new bootstrap.Toast(userSavedToast as Element);
        toast.show()
      });
    }
  }

  onDelete() {
    const part: BurgerPartModel = { ...this.mainForm.value } as BurgerPartModel;

    this.partService.delete(part._id ?? '').subscribe((result) => {
      this.router.navigate(['/', 'admin', 'parts'])
    });

  }
}
