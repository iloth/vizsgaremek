import { FormControl, FormGroup } from "@angular/forms";
import { EditModes } from "../utils/EditModes";
import { BasePage } from "./BasePage";

export abstract class BaseFormPage extends BasePage {

  abstract mainForm: FormGroup;
  public editMode: EditModes = EditModes.Create;

  public get EditModes() {
    return EditModes; 
  }

  public control(path: string, form: FormGroup = this.mainForm): FormControl {
    return form.get(path) as FormControl;
  }

  public controlIsInvalid(path: string, form: FormGroup = this.mainForm): boolean {
    const control = this.control(path, form);
    return control.invalid && (control.dirty || control.touched);
  }

  public controlIsInvalidStrict(path: string, form: FormGroup = this.mainForm): boolean {
    return this.control(path, form).invalid;
  }

}