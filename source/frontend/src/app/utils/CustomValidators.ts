import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

   static mustMatch(control1Name: string, control2Name: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const control1 = form.get(control1Name);
      const control2 = form.get(control2Name);

      if (control1 && control2 && control1?.value !== control2?.value) {
        control2.setErrors({
          mustMatch: true
        });
        return {
          mustMatch: true
        }
      } else {
        control2?.setErrors(null);
        return null;
      }

    } 
  }
  
}