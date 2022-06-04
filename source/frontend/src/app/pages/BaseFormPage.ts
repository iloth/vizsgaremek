import { FormControl, FormGroup } from "@angular/forms";
import { EditModes } from "../models/common/EditModes";
import { BasePage } from "./BasePage";

export abstract class BaseFormPage extends BasePage {

  abstract mainForm: FormGroup;

  public get EditModes() {
    return EditModes; 
  }

  public control(path: string): FormControl {
    return this.mainForm.get(path) as FormControl;
  }

}