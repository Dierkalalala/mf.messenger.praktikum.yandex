"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isEqual(lhs, rhs) {
  return lhs === rhs;
}

var Route = /*#__PURE__*/function () {
  function Route(pathname, view, props) {
    _classCallCheck(this, Route);

    _defineProperty(this, "_pathname", void 0);

    _defineProperty(this, "_blockClass", void 0);

    _defineProperty(this, "_block", void 0);

    _defineProperty(this, "_props", void 0);

    _defineProperty(this, "__root", void 0);

    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this.__root = document.querySelector(this._props.rootQuery);

    if (this.__root === null) {
      throw new Error('Кореневая директория не найдена');
    }
  }

  _createClass(Route, [{
    key: "navigate",
    value: function navigate(pathname) {
      if (this.match(pathname)) {
        this._pathname = pathname;
        this.render();
      }
    }
  }, {
    key: "leave",
    value: function leave() {
      if (this._block) {
        this._block.hide();
      }
    }
  }, {
    key: "match",
    value: function match(pathname) {
      return isEqual(pathname, this._pathname);
    }
  }, {
    key: "render",
    value: function render() {
      if (!this._block) {
        this._block = this._blockClass;

        if (this._block !== null && this.__root !== null) {
          this._block.renderTo(this.__root);
        }

        return;
      }

      this._block.show();
    }
  }]);

  return Route;
}();

var _default = Route;
exports["default"] = _default;