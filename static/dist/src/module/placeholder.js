"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InputPlaceholder = /*#__PURE__*/function () {
  function InputPlaceholder(inputs) {
    var _this = this;

    _classCallCheck(this, InputPlaceholder);

    _defineProperty(this, "inputs", void 0);

    this.inputs = Array.from(inputs);
    this.inputs.forEach(function (input) {
      input.addEventListener('blur', InputPlaceholder.blur.bind(_this, input));
    });
  }

  _createClass(InputPlaceholder, null, [{
    key: "blur",
    value: function blur(input) {
      var parent = input.closest('label');
      console.log(input.value);

      if (input.value === '' && parent !== null) {
        parent.classList.remove('js-focused');
        return false;
      }

      if (parent !== null) {
        parent.classList.add('js-focused');
      }
    }
  }]);

  return InputPlaceholder;
}();

var _default = InputPlaceholder;
exports["default"] = _default;