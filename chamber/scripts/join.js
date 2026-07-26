const timestampField = document.querySelector("#timestamp");
const modalButtons = document.querySelectorAll("[data-dialog]");
const dialogs = document.querySelectorAll(".membership-dialog");

if (timestampField) {
  timestampField.value = new Date().toISOString();
}

modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const dialogId = button.dataset.dialog;
    const dialog = document.querySelector(`#${dialogId}`);

    if (dialog) {
      dialog.showModal();
    }
  });
});

dialogs.forEach((dialog) => {
  const closeButton = dialog.querySelector(".close-dialog");

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      dialog.close();
    });
  }

  dialog.addEventListener("click", (event) => {
    const dialogDimensions = dialog.getBoundingClientRect();

    const clickedOutside =
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom;

    if (clickedOutside) {
      dialog.close();
    }
  });
});