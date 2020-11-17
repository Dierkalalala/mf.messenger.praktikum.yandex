"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _MailRegExp = _interopRequireDefault(require("./MailRegExp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ValidationMethods = {
  inputs: {},
  errorMessages: {
    required: 'Обязательно для заполнения',
    email: 'Введите корректный email',
    minLength: "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 {length}",
    isFocused: ''
  },
  printErrorMessage: function printErrorMessage(input, text) {
    var label = input.closest('label');
    var errorTextElement = label.querySelector('.input-error');
    errorTextElement.textContent = text;
  },
  validate: function validate(inputs) {
    ValidationMethods.inputs = inputs;

    var _loop = function _loop(name) {
      var input = document.getElementsByName(name)[0];
      var rules = [];
      rules = Object.entries(inputs[name]).reduce(function (acc, inp) {
        var validationFunctionName = inp[0];
        var validationFunction = Validators[validationFunctionName].bind(input);
        var validationArgument = inp[1];
        acc.push({
          "function": validationFunction,
          arguments: validationArgument
        });
        return acc;
      }, []);
      input.addEventListener('blur', function () {
        for (var i = 0; i < rules.length; i++) {
          var ruleResult = rules[i]["function"](rules[i].arguments);

          if (!ruleResult) {
            return false;
          }
        }
      });
      input.addEventListener('focus', function () {
        ValidationMethods.printErrorMessage(input, ValidationMethods.errorMessages.isFocused);
      });
    };

    for (var name in inputs) {
      _loop(name);
    }
  },
  validateFieldsImmediately: function validateFieldsImmediately(inputs) {
    var _this = this;

    if (inputs == undefined) {
      inputs = ValidationMethods.inputs;
    }

    console.log(inputs);
    var has_errors = false;

    var _loop2 = function _loop2(name) {
      if (!_this.elements[name]) {
        return "continue";
      }

      var input = document.getElementsByName(name)[0];
      var rules = [];
      rules = Object.entries(inputs[name]).reduce(function (acc, inp) {
        var validationFunctionName = inp[0];
        var validationFunction = Validators[validationFunctionName].bind(input);
        var validationArgument = inp[1];
        acc.push({
          "function": validationFunction,
          arguments: validationArgument
        });
        return acc;
      }, []);
      var notValid = true;

      for (var i = 0; i < rules.length; i++) {
        if (notValid) {
          var ruleResult = rules[i]["function"](rules[i].arguments);

          if (!ruleResult) {
            has_errors = true;
            notValid = false;
          }
        }
      }
    };

    for (var name in inputs) {
      var _ret = _loop2(name);

      if (_ret === "continue") continue;
    }

    return has_errors;
  }
}; // Опираясь на данную реализацию, возможно ли сделать функции валидации чистыми?

var Validators = {
  "email": function email() {
    if (!_MailRegExp["default"].test(String(this.value).toLowerCase())) {
      ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.email);
      return false;
    }

    return true;
  },
  "required": function required() {
    if (this.value === '') {
      ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.required);
      return false;
    }

    return true;
  },
  "minLength": function minLength(length) {
    if (this.value.length < length) {
      ValidationMethods.printErrorMessage(this, ValidationMethods.errorMessages.minLength.replace('{length}', String(length)));
      return false;
    }

    return true;
  }
};
var _default = ValidationMethods;
exports["default"] = _default;