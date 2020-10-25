class InputPlaceholder {
    constructor(inputs) {
        this.inputs = Array.from(inputs);
        this.inputs.forEach(input => {
            input.addEventListener('blur', this.blur.bind(input))
        })
    }

    blur(e) {
        let parent = this.closest('label');
        if (this.value === '') {
            parent.classList.remove('js-focused');
            return false
        }
        parent.classList.add('js-focused');
    }
}

export default InputPlaceholder;
