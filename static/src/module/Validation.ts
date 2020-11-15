interface Inputs {
    [items: string]: { [key: string ] : boolean | string | number }
}

interface Rule {
    function: Function,
    arguments: string | number | boolean
}

interface ValidatorsType {
    [key: string]: any
}

type ValidationK = keyof ValidatorsType

import MailRegExp from './MailRegExp'

const ValidationMethods = {

    inputs: {},

    errorMessages: {
        required: 'Обязательно для заполнения',
        email: 'Введите корректный email',
        minLength: `Минимальное количество символов {length}`,
        isFocused: ''
    },
    printErrorMessage: (input: HTMLElement, text: string) => {
        let label = input.closest('label') as HTMLLabelElement;
        let errorTextElement = label.querySelector('.input-error') as HTMLElement
        errorTextElement.textContent = text;
    },

    validate: (inputs: Inputs): void => {
        ValidationMethods.inputs = inputs;
        for (let name in inputs) {
            let input = document.getElementsByName(name)[0];
            let rules: Rule[] = [];

            rules = Object.entries(inputs[name]).reduce((acc: Rule[], inp) => {

                const validationFunctionName : ValidationK = inp[0];
                const validationFunction: Function = Validators[validationFunctionName].bind(input);
                const validationArgument: string | number | boolean = inp[1];
                acc.push(
                    {
                        function: validationFunction,
                        arguments: validationArgument,
                    }
                )
                return acc;
            }, []);

            input.addEventListener('blur', () => {
                for (let i = 0; i < rules.length; i++) {
                    let ruleResult: boolean = rules[i].function(rules[i].arguments);
                    if (!ruleResult) {
                        return false;
                    }
                }
            });
            input.addEventListener('focus', () => {
                ValidationMethods.printErrorMessage(input, ValidationMethods.errorMessages.isFocused)
            });

        }
    },

    validateFieldsImmediately: function (inputs: Inputs) {
        if (inputs == undefined) {
            inputs = ValidationMethods.inputs;

        }

        let has_errors: boolean = false;

        for (let name in inputs) {
            if (!this.elements[name]) {
                continue;
            }
            const input = document.getElementsByName(name)[0];
            let rules: Rule[] = [];

            rules = Object.entries(inputs[name]).reduce((acc: Rule[], inp) => {

                const validationFunctionName : ValidationK = inp[0];
                const validationFunction: Function = Validators[validationFunctionName].bind(input);
                const validationArgument: string | number | boolean = inp[1];
                acc.push(
                    {
                        function: validationFunction,
                        arguments: validationArgument,
                    }
                )
                return acc;
            }, []);

            let notValid = true;
            for (let i = 0; i < rules.length; i++) {
                if (notValid) {
                    let ruleResult = rules[i].function(rules[i].arguments);
                    if (!ruleResult) {
                        has_errors = true;
                        notValid = false
                    }
                }
            }
        }
        return has_errors
    },
}
// Опираясь на данную реализацию, возможно ли сделать функции валидации чистыми?

const Validators : ValidatorsType = {
    "email": function (): boolean {
        if (!MailRegExp.test(String(this.value).toLowerCase())) {
            ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.email)
            return false;
        }
        return true
    },

    "required": function () : boolean {
        if (this.value === '') {

            ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.required)

            return false;
        }
        return true
    },

    "minLength": function (length: number) : boolean {
        if (this.value.length < length) {
            ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.minLength.replace('{length}', String(length)));
            return false
        }
        return true;
    },
}

export default ValidationMethods
