class ModalTrigger {
    constructor() {

        document.addEventListener('click', this.activateModal.bind(this));
        document.addEventListener('click', this.closeModal.bind(this));


    }

    activateModal(e) {
        this.modalOverLay = document.querySelector('.modal-overlay');
        let path = e.path || e.composedPath();
        path.pop();
        path.pop()
        let button = Array.from(path).find(el => {
            return el.matches('[data-modal-id]');
        })
        if (button) {
            let modalId = button.getAttribute('data-modal-id');
            let modal = document.querySelector(modalId);
            this.modalOverLay.classList.add('active');
            modal.classList.add('active');
        }
    }

    closeModal(e) {
        this.modalOverLay = document.querySelector('.modal-overlay');
        let path = e.path || e.composedPath();
        path.pop();
        path.pop()
        let button = Array.from(path).find(el => {
            return el.matches('[data-js-modal-close]');
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
