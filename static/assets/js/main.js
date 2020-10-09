class InputPlaceholder {
    constructor(inputs) {
        this.inputs = Array.from(inputs);

        this.inputs.forEach(input => {
            input.addEventListener('focus', this.focus.bind(input));
            input.addEventListener('blur', this.blur.bind(input))
        })
    }

    focus(e) {
        let parent = this.closest('label');
        parent.classList.add('js-focused');
    }

    blur(e) {
        let parent = this.closest('label');
        if (this.value !== '') {
            return false
        }
        parent.classList.remove('js-focused');
    }
}

class formSubmitionHandler {
    constructor(form) {
        this.form = form;
        this.form.addEventListener('submit', this.submit)
    }

    submit(e) {

        e.preventDefault();
    }


}

class ChatMessagesBody {
    constructor(body, bodyWrapper) {
        this.body = body;
        this.bodyWrapper = bodyWrapper;
        window.addEventListener('resize', this.changeMargin.bind(this));
        window.addEventListener('load', this.changeMargin.bind(this));
    }

    changeMargin() {
        let bodyHeight = this.body.offsetHeight;
        let bodyWrapperHeight = this.bodyWrapper.offsetHeight;

        console.log(bodyWrapperHeight);


        if (bodyWrapperHeight > bodyHeight) {
            this.bodyWrapper.style.marginTop = '';
        } else {
            this.bodyWrapper.style.marginTop = bodyHeight - bodyWrapperHeight - 20 + 'px';
        }
    }


}

class DropDownWrapper {
    constructor(drop) {
        this.drop = drop;
        this.timer = '';
        this.drop.addEventListener('mouseover', this.openDropDown.bind(this));
        this.drop.addEventListener('mouseout', this.closeDropDown.bind(this));

    }

    openDropDown() {

        this.drop.classList.add('active');
        clearTimeout(this.timer);


    }

    closeDropDown() {
        this.timer = setTimeout(() => {
            this.drop.classList.remove('active')
        }, 1000)
    }


}

class ModalTrigger {
    constructor(modalButtons) {
        this.modalOverLay = document.querySelector('.modal-overlay');
        this.buttons = Array.from(modalButtons)
        this.buttons.forEach(button => {
            button.addEventListener('click', this.activateModal.bind(this, button));
        })
        this.closeButtons = Array.from(document.querySelectorAll('[data-js-modal-close]'));
        console.log(this.closeButtons);
        this.closeButtons.forEach(close => {
            close.addEventListener('click', this.closeModal.bind(this));
        })

    }

    activateModal(button) {
        let modalId = button.getAttribute('data-modal-id');
        let modal = document.querySelector(modalId);
        console.log(modalId);
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
    let chatMessagesBody =
        new ChatMessagesBody(
            document.querySelector('.chat-messages-body'),
            document.querySelector('.chat-messages-body-wrapper')
        );
    new ModalTrigger(
        document.querySelectorAll('.js-modal-trigger')
    )
    new InputPlaceholder(document.querySelectorAll('.js-input-control'));
    let chatMenuDropDown = new DropDownWrapper(document.querySelector('.chat-messages-drop'))
    let chatClipDropDown = new DropDownWrapper(document.querySelector('.clip-wrapper'))
});

