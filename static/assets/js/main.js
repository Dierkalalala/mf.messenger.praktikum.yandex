

document.addEventListener('DOMContentLoaded', function(event) {
  const modals = new ModalTrigger(
      document.querySelectorAll('.js-modal-trigger'));

  new InputPlaceholder(document.querySelectorAll('.js-input-control'));

  const forms = document.querySelectorAll('form');
  Array.from(forms).forEach((form) => {
    form.addEventListener('submit', submitForm);
  });
});

