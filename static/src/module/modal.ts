class ModalTrigger {
    modalOverLay: HTMLElement

    constructor() {
        document.addEventListener('click', this.activateModal.bind(this));
        document.addEventListener('click', this.closeModal.bind(this));
    }

    activateModal(e: Event) {
        this.modalOverLay = document.querySelector('.modal-overlay') as HTMLElement;
        let path = e.composedPath();
        path.pop();
        path.pop()
        let button = Array.from(path).find(el => {
            return (el as HTMLElement).matches('[data-modal-id]');
        }) as HTMLElement
        if (button) {
            let modalId = button.getAttribute('data-modal-id') as string;
            let modal = document.querySelector(modalId) as HTMLElement;
            this.modalOverLay.classList.add('active');
            modal.classList.add('active');
        }
    }

    closeModal(e: Event) {
        this.modalOverLay = document.querySelector('.modal-overlay') as HTMLElement;
        let path = e.composedPath();
        path.pop();
        path.pop()
        let button = Array.from(path).find(el => {
            return (el as HTMLElement).matches('[data-js-modal-close]');
        })
        if (button) {
            this.modalOverLay.classList.remove('active');
            Array.from(this.modalOverLay.children).forEach((modal) => {
                modal.classList.remove('active');
            });
        }
    }
}

export default ModalTrigger;
