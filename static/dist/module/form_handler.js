import Validation from './Validation.js';
function handleFormValidation(e, inputs = undefined) {
    console.log(inputs);
    const hasErrorsBoundFunc = Validation.validateFieldsImmediately.bind(e.target, inputs);
    const hasErrors = hasErrorsBoundFunc();
    console.log(hasErrors);
    e.preventDefault();
    if (!hasErrors) {
        return new FormData(e.target);
    }
    return false;
}
export default handleFormValidation;
//# sourceMappingURL=form_handler.js.map