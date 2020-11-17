import Validation from './Validation'

interface Inputs {
    [items: string]: { [key: string ] : boolean | string | number }
}

function handleFormValidation(e: Event, inputs : Inputs | undefined = undefined): FormData | boolean {
    console.log(inputs);
    const hasErrorsBoundFunc: Function = Validation.validateFieldsImmediately.bind(e.target, inputs);
    const hasErrors = hasErrorsBoundFunc();
    console.log(hasErrors);
    e.preventDefault();
    if (!hasErrors) {
        return new FormData(( e.target as HTMLFormElement) );
    }
    return false;
}
export default handleFormValidation;

