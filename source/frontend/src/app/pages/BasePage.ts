import * as bootstrap from "bootstrap";

export abstract class BasePage {

  showError(err: Error) {
    const errorToeastElement = document.getElementById('errorToast') as Element;
    if (errorToeastElement) {
      const body = errorToeastElement.getElementsByClassName('toast-body')[0];
      body.textContent = err.message;
      const errorToast = new bootstrap.Toast(errorToeastElement);
      errorToast.show();
    }
    console.error(err.message);
  }

}