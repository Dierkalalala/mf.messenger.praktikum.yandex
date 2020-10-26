import Validation from './Validation.js';
function submitForm(e) {
    let hasErrorsBoundFunc = Validation.validateFieldsImmediately.bind(this);
    let hasErrors = hasErrorsBoundFunc();
    e.preventDefault();
    if (!hasErrors) {
        let formData = new FormData(this);
        console.log(formData);
    }
}
export default submitForm;
//# sourceMappingURL=form_handler.js.map