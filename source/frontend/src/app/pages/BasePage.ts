import { FormControl, FormGroup } from "@angular/forms";
import { EditModes } from "../models/common/EditModes";
import { Roles } from "../models/common/Roles";

export abstract class BasePage {

  abstract mainForm: FormGroup;

  public get EditModes() {
    return EditModes; 
  }

  public get Roles() {
    return Roles;
  }

  public control(path: string): FormControl {
    return this.mainForm.get(path) as FormControl;
  }

}