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
export default ModalTrigger
