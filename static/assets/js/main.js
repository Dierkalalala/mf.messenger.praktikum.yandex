class InputPlaceholder {
    constructor(inputs) {
        this.inputs = Array.from(inputs);
        this.inputs.forEach(input => {
            input.addEventListener('blur', this.blur.bind(input))
        })
    }

    blur(e) {
        let parent = this.closest('label');
        if (this.value !== '') {
            return false
        }
        parent.classList.remove('js-focused');
    }
}

function submitForm(e) {
    e.preventDefault();
    let formData = new FormData(this);
    console.log([...formData])
}

class ModalTrigger {
    constructor(modalButtons) {
        this.modalOverLay = document.querySelector('.modal-overlay');
        this.buttons = Array.from(modalButtons)
        this.buttons.forEach(button => {
            button.addEventListener('click', this.activateModal.bind(this, button));
        })
        this.closeButtons = Array.from(document.querySelectorAll('[data-js-modal-close]'));
        this.closeButtons.forEach(close => {
            close.addEventListener('click', this.closeModal.bind(this));
        })

    }

    activateModal(button) {
        let modalId = button.getAttribute('data-modal-id');
        let modal = document.querySelector(modalId);
        this.modalOverLay.classList.add('active');
        modal.classList.add('active');

    }

    closeModal() {

        this.modalOverLay.classList.remove('active');
        Array.from(this.modalOverLay.children).forEach(modal => {
            modal.classList.remove('active')
        })
    }

}


document.addEventListener("DOMContentLoaded", function (event) {

    const modals = new ModalTrigger(
        document.querySelectorAll('.js-modal-trigger'));

    new InputPlaceholder(document.querySelectorAll('.js-input-control'));

    let forms = document.querySelectorAll('form');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', submitForm)
    })

});

