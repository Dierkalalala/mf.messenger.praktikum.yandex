"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ModalTrigger = /*#__PURE__*/function () {
  function ModalTrigger() {
    _classCallCheck(this, ModalTrigger);

    _defineProperty(this, "modalOverLay", void 0);

    document.addEventListener('click', this.activateModal.bind(this));
    document.addEventListener('click', this.closeModal.bind(this));
  }

  _createClass(ModalTrigger, [{
    key: "activateModal",
    value: function activateModal(e) {
      this.modalOverLay = document.querySelector('.modal-overlay');
      var path = e.composedPath();
      path.pop();
      path.pop();
      var button = Array.from(path).find(function (el) {
        return el.matches('[data-modal-id]');
      });

      if (button) {
        var modalId = button.getAttribute('data-modal-id');
        var modal = document.querySelector(modalId);
        this.modalOverLay.classList.add('active');
        modal.classList.add('active');
      }
    }
  }, {
    key: "closeModal",
    value: function closeModal(e) {
      this.modalOverLay = document.querySelector('.modal-overlay');
      var path = e.composedPath();
      path.pop();
      path.pop();
      var button = Array.from(path).find(function (el) {
        return el.matches('[data-js-modal-close]');
      });

      if (button) {
        this.modalOverLay.classList.remove('active');
        Array.from(this.modalOverLay.children).forEach(function (modal) {
          modal.classList.remove('active');
        });
      }
    }
  }]);

  return ModalTrigger;
}();

var _default = ModalTrigger;
exports["default"] = _default;