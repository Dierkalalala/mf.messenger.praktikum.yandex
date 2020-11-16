"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../../src/pages/profile/index"));

var _index2 = _interopRequireDefault(require("../../src/pages/open-chat/index"));

var _index3 = _interopRequireDefault(require("../../src/pages/no-chat/index"));

var _index4 = _interopRequireDefault(require("../../src/pages/profile-edit/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var State = /*#__PURE__*/function () {
  function State() {
    _classCallCheck(this, State);

    _defineProperty(this, "chats", void 0);

    _defineProperty(this, "auth", void 0);

    _defineProperty(this, "users", void 0);

    _defineProperty(this, "activeChat", void 0);

    if (State.__instance) {
      return State.__instance;
    }

    this.chats = {};
    this.auth = {};
    this.users = {};
    this.activeChat = {};

    this._generateProxies();

    State.__instance = this;
  }

  _createClass(State, [{
    key: "_clearAllProxies",
    value: function _clearAllProxies() {
      this.chats = {};
      this.users = {};
      this.auth = {};
      this.activeChat = {};
    }
  }, {
    key: "_generateProxies",
    value: function _generateProxies() {
      this.chats = new Proxy(this.chats, {
        get: function get(target, prop) {
          return target[prop];
        },
        set: function set(target, prop, newValue) {
          target[prop] = newValue;

          _index2["default"].eventBus.emit('flow:component-did-update');

          _index3["default"].eventBus.emit('flow:component-did-update');

          return true;
        },
        deleteProperty: function deleteProperty(target, prop) {
          void target;
          void prop;
          throw new Error('нет доступа');
        }
      });
      this.auth = new Proxy(this.auth, {
        get: function get(target, prop) {
          return target[prop];
        },
        set: function set(target, prop, newValue) {
          target[prop] = newValue;

          _index["default"].eventBus.emit('flow:component-did-update');

          _index4["default"].eventBus.emit('flow:component-did-update');

          return true;
        },
        deleteProperty: function deleteProperty(target, prop) {
          void target;
          void prop;
          throw new Error('нет доступа');
        }
      });
      this.users = new Proxy(this.users, {
        get: function get(target, prop) {
          return target[prop];
        },
        set: function set(target, prop, newValue) {
          console.log('set');
          target[prop] = newValue;

          _index["default"].eventBus.emit('flow:component-did-update');

          _index4["default"].eventBus.emit('flow:component-did-update');

          return true;
        },
        deleteProperty: function deleteProperty(target, prop) {
          void target;
          void prop;
          throw new Error('нет доступа');
        }
      });
      this.activeChat = new Proxy(this.activeChat, {
        get: function get(target, prop) {
          return target[prop];
        },
        set: function set(target, prop, newValue) {
          target[prop] = newValue;

          _index2["default"].eventBus.emit('flow:component-did-update');

          return true;
        },
        deleteProperty: function deleteProperty(target, prop) {
          void target;
          void prop;
          throw new Error('нет доступа');
        }
      });
    }
  }, {
    key: "checkForAuth",
    value: function checkForAuth() {
      return this.auth.hasOwnProperty('id');
    }
  }, {
    key: "set",
    value: function set(name, object) {
      Object.assign(this[name], object);
    }
  }, {
    key: "clearAll",
    value: function clearAll() {
      this._clearAllProxies();

      this._generateProxies();
    }
  }, {
    key: "get",
    value: function get(name) {
      return this[name];
    }
  }]);

  return State;
}();

_defineProperty(State, "__instance", void 0);

var store = new State();
var _default = store;
exports["default"] = _default;