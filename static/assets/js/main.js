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

    blur(e){
        let parent = this.closest('label');
        if(this.value !== '') {
            return false
        }
        parent.classList.remove('js-focused');
    }
}
class formSubmitionHandler{
    constructor(form) {
        this.form = form;
        this.form.addEventListener('submit', this.submit)
    }

    submit(e) {

        e.preventDefault();
    }



}


new InputPlaceholder(document.querySelectorAll('.js-input-control'))
