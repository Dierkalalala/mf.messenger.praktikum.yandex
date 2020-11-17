import MailRegExp from './MailRegExp.js';
const ValidationMethods = {
    inputs: {},
    errorMessages: {
        required: 'Обязательно для заполнения',
        email: 'Введите корректный email',
        minLength: `Минимальное количество символов {length}`,
        isFocused: ''
    },
    printErrorMessage: (input, text) => {
        let label = input.closest('label');
        let errorTextElement = label.querySelector('.input-error');
        errorTextElement.textContent = text;
    },
    validate: (inputs) => {
        ValidationMethods.inputs = inputs;
        for (let name in inputs) {
            let input = document.getElementsByName(name)[0];
            let rules = [];
            rules = Object.entries(inputs[name]).reduce((acc, inp) => {
                const validationFunctionName = inp[0];
                const validationFunction = Validators[validationFunctionName].bind(input);
                const validationArgument = inp[1];
                acc.push({
                    function: validationFunction,
                    arguments: validationArgument,
                });
                return acc;
            }, []);
            input.addEventListener('blur', () => {
                for (let i = 0; i < rules.length; i++) {
                    let ruleResult = rules[i].function(rules[i].arguments);
                    if (!ruleResult) {
                        return false;
                    }
                }
            });
            input.addEventListener('focus', () => {
                ValidationMethods.printErrorMessage(input, ValidationMethods.errorMessages.isFocused);
            });
        }
    },
    validateFieldsImmediately: function (inputs) {
        if (inputs == undefined) {
            inputs = ValidationMethods.inputs;
        }
        console.log(inputs);
        let has_errors = false;
        for (let name in inputs) {
            if (!this.elements[name]) {
                continue;
            }
            const input = document.getElementsByName(name)[0];
            let rules = [];
            rules = Object.entries(inputs[name]).reduce((acc, inp) => {
                const validationFunctionName = inp[0];
                const validationFunction = Validators[validationFunctionName].bind(input);
                const validationArgument = inp[1];
                acc.push({
                    function: validationFunction,
                    arguments: validationArgument,
                });
                return acc;
            }, []);
            let notValid = true;
            for (let i = 0; i < rules.length; i++) {
                if (notValid) {
                    let ruleResult = rules[i].function(rules[i].arguments);
                    if (!ruleResult) {
                        has_errors = true;
                        notValid = false;
                    }
                }
            }
        }
        return has_errors;
    },
};
// Опираясь на данную реализацию, возможно ли сделать функции валидации чистыми?
const Validators = {
    "email": function () {
        if (!MailRegExp.test(String(this.value).toLowerCase())) {
            ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.email);
            return false;
        }
        return true;
    },
    "required": function () {
        if (this.value === '') {
            ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.required);
            return false;
        }
        return true;
    },
    "minLength": function (length) {
        if (this.value.length < length) {
            ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.minLength.replace('{length}', String(length)));
            return false;
        }
        return true;
    },
};
export default ValidationMethods;
//# sourceMappingURL=Validation.js.map