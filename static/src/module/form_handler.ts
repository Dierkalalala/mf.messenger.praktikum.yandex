import Validation from './Validation'
function handleFormValidation(e: Event): FormData | boolean {
    const hasErrorsBoundFunc: Function = Validation.validateFieldsImmediately.bind(e.target);
    const hasErrors = hasErrorsBoundFunc();
    e.preventDefault();
    if (!hasErrors) {
        return new FormData(( e.target as HTMLFormElement) );
    }
    return false;
}
export default handleFormValidation;

