"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Validation = _interopRequireDefault(require("./Validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function handleFormValidation(e) {
  var hasErrorsBoundFunc = _Validation["default"].validateFieldsImmediately.bind(e.target);

  var hasErrors = hasErrorsBoundFunc();
  e.preventDefault();

  if (!hasErrors) {
    return new FormData(e.target);
  }

  return false;
}

var _default = handleFormValidation;
exports["default"] = _default;