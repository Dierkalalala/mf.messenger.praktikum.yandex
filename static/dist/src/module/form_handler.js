import Validation from './Validation.js';
function handleFormValidation(e) {
    const hasErrorsBoundFunc = Validation.validateFieldsImmediately.bind(e.target);
    const hasErrors = hasErrorsBoundFunc();
    e.preventDefault();
    if (!hasErrors) {
        return new FormData(e.target);
    }
    return false;
}
export default handleFormValidation;
//# sourceMappingURL=form_handler.js.map
