import Validation from './Validation'

function submitForm(e: Event): void {
    const hasErrorsBoundFunc: Function = Validation.validateFieldsImmediately.bind(this);
    const hasErrors: boolean = hasErrorsBoundFunc();
    e.preventDefault();
    if (!hasErrors) {
        const formData = new FormData(this);
        console.log(formData);
    }


}

export default submitForm;
