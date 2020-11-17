class InputPlaceholder {
    constructor(inputs) {
        this.inputs = Array.from(inputs);
        this.inputs.forEach((input) => {
            input.addEventListener('blur', InputPlaceholder.blur.bind(this, input));
        });
    }
    static blur(input) {
        let parent = input.closest('label');
        if (parent === null) {
            return;
        }
        if (input.value === '') {
            parent.classList.remove('js-focused');
            return false;
        }
        parent.classList.add('js-focused');
    }
}
export default InputPlaceholder;
//# sourceMappingURL=placeholder.js.map