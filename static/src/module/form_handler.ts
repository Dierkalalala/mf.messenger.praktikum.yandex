import Validation from './Validation.js'

function submitForm(e: Event): void {
    let hasErrorsBoundFunc: Function = Validation.validateFieldsImmediately.bind(this);
    let hasErrors: boolean = hasErrorsBoundFunc();
    e.preventDefault();
    if (!hasErrors) {
        let formData = new FormData(this);
        console.log(formData);
    }


}

export default submitForm;
