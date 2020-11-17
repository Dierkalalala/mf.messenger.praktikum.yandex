"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Validation = _interopRequireDefault(require("./Validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function handleFormValidation(e) {
  var inputs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  console.log(inputs);

  var hasErrorsBoundFunc = _Validation["default"].validateFieldsImmediately.bind(e.target, inputs);

  var hasErrors = hasErrorsBoundFunc();
  console.log(hasErrors);
  e.preventDefault();

  if (!hasErrors) {
    return new FormData(e.target);
  }

  return false;
}

var _default = handleFormValidation;
exports["default"] = _default;