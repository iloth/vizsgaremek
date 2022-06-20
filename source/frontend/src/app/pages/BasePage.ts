import * as bootstrap from "bootstrap";
export abstract class BasePage {

  showError(err: Error) {
    const errorToeastElement = document.getElementById('errorToast');
    if (errorToeastElement) {
      const toastBody = errorToeastElement.getElementsByClassName('toast-body')[0];
      toastBody.textContent = err.message;
      const errorToast = new bootstrap.Toast(errorToeastElement);

      errorToast?.show(); 
    }
    console.error(err);
  }

}