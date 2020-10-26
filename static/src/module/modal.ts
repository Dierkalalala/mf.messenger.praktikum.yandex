class ModalTrigger {
    modalOverLay: HTMLElement;
    buttons : HTMLElement[];
    closeButtons: HTMLElement[];
    constructor(modalButtons: HTMLElement[]) {
        this.modalOverLay = document.querySelector('.modal-overlay') as HTMLElement;
        this.buttons = Array.from(modalButtons)
        this.buttons.forEach((button : HTMLElement) => {
            button.addEventListener('click', this.activateModal.bind(this, button));
        })
        this.closeButtons = Array.from(document.querySelectorAll('[data-js-modal-close]'));
        this.closeButtons.forEach(close => {
            close.addEventListener('click', this.closeModal.bind(this));
        })

    }

    activateModal(button : HTMLElement) {
        if (button) {
            let modalId = button.getAttribute('data-modal-id') as string;
            let modal: HTMLElement = document.querySelector(modalId) as HTMLElement;
            this.modalOverLay.classList.add('active');
            modal.classList.add('active');
        }


    }

    closeModal() {
        this.modalOverLay.classList.remove('active');
        Array.from(this.modalOverLay.children).forEach((modal: HTMLElement) => {
            modal.classList.remove('active')
        })
    }
}
export default ModalTrigger
