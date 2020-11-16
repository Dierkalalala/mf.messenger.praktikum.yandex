class InputPlaceholder {
    inputs: Element[];

    constructor(inputs: Element[]) {
        this.inputs = Array.from(inputs);
        this.inputs.forEach((input: Element) => {
            input.addEventListener('blur', InputPlaceholder.blur.bind(this, input))
        })
    }

    static blur(input: HTMLInputElement) {
        let parent = input.closest('label');
        console.log(input.value);
        if (input.value === '' && parent !== null) {
            parent.classList.remove('js-focused');
            return false
        }
        if (parent !== null) {
            parent.classList.add('js-focused');
        }
    }
}

export default InputPlaceholder;
