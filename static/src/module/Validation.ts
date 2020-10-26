interface Inputs {
    [items: string]: { [key: string]: boolean | string | number }
}
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

    validate: (inputs: Inputs) : void => {
        ValidationMethods.inputs = inputs;
        for (let name in inputs) {
            let input = document.getElementsByName(name)[0];
            let rules: {function: Function, arguments: string | number | boolean}[] = [];
            Object.entries(inputs[name]).forEach((inp: [string, string | number | boolean]) => {
                // @ts-ignore
                let validationFunction: Function = ValidationMethods.validators[inp[0]].bind(input);
                rules.push(
                    {
                        function: validationFunction,
                        arguments: inp[1]
                    }
                )
            })

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

        let has_errors : boolean = false;

        for (let name in inputs) {
            if (!this.elements[name]){
                continue;
            }
            let input: HTMLElement = document.getElementsByName(name)[0];
            let rules: {function: Function, arguments: string | number | boolean}[] = [];
            Object.entries(inputs[name]).forEach(inp => {
                // @ts-ignore
                let validationFunction = ValidationMethods.validators[inp[0]].bind(input);


                rules.push(
                    {
                        function: validationFunction,
                        arguments: inp[1]
                    }
                )
            });
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

    validators: {
        email: function () {
            const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!re.test(String(this.value).toLowerCase())) {
                ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.email)

                return false;
            }
            return true
        } ,

        required: function () {
            if (this.value === '') {

                ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.required)

                return false;
            }
            return true
        },

        minLength: function (length: number) {
            if (this.value.length < length) {
                ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.minLength.replace('{length}', String(length)));
                return false
            }
            return true;
        },
    },


}

export default ValidationMethods
