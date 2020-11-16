"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var EventBus = /*#__PURE__*/function () {
  function EventBus() {
    _classCallCheck(this, EventBus);

    _defineProperty(this, "listeners", void 0);

    this.listeners = {};
  }

  _createClass(EventBus, [{
    key: "on",
    value: function on(event, callback) {
      if (this.listeners[event] === undefined) {
        this.listeners[event] = [callback];
        return;
      }

      this.listeners[event].push(callback);
    }
  }, {
    key: "off",
    value: function off(event, callback) {
      this._checkEventForExisence(event);

      if (this.listeners[event] !== undefined) {
        this.listeners[event] = this.listeners[event].filter(function (ecallback) {
          return ecallback !== callback;
        });
      }
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this._checkEventForExisence(event);

      this.listeners[event].forEach(function (callback) {
        var callbackFunction = callback.bind.apply(callback, [null].concat(args));
        callbackFunction();
      });
    }
  }, {
    key: "_checkEventForExisence",
    value: function _checkEventForExisence(event) {
      if (this.listeners[event] == undefined) {
        throw new Error("\u041D\u0435\u0442 \u0441\u043E\u0431\u044B\u0442\u0438\u044F ".concat(event));
      }
    }
  }]);

  return EventBus;
}();

var _default = EventBus;
exports["default"] = _default;