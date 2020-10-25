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
        let errorTextElement = label.querySelector('.input-error')
        errorTextElement.textContent = text;
    },

    validate: (inputs) => {
        ValidationMethods.inputs = inputs;
        for (let name in inputs) {
            let input = document.getElementsByName(name)[0];
            let rules = [];
            Object.entries(inputs[name]).forEach(inp => {
                let validationFunction = ValidationMethods.validators[inp[0]].bind(input);
                rules.push(
                    {
                        function: validationFunction,
                        arguments: inp[1]
                    }
                )
            })

            input.addEventListener('blur', () => {
                for (let i = 0; i < rules.length; i++) {
                    let ruleResult = rules[i].function(rules[i].arguments);
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

    validateFieldsImmediately: function (inputs) {
        if (inputs == undefined) {
            inputs = ValidationMethods.inputs;


        }

        console.log(this);




        let has_errors = false;


        for (let name in inputs) {
            console.log(this.elements[name]);
            if (!this.elements[name]){
                continue;
            }
            let input = document.getElementsByName(name)[0];
            let rules = [];
            Object.entries(inputs[name]).forEach(inp => {
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
                let label = this.closest('label');

                ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.email)

                return false;
            }
            return true
        },

        required: function (input) {
            if (this.value === '') {
                let label = this.closest('label');

                ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.required)

                return false;
            }
            return true
        },

        minLength: function (length) {
            if (this.value.length < length) {
                let label = this.closest('label');
                ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.minLength.replace('{length}', length));
                return false
            }
            return true;
        },
    },


}

export default ValidationMethods
