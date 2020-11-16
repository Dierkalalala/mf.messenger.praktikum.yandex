"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authApi = _interopRequireDefault(require("../api/auth-api"));

var _index = _interopRequireDefault(require("../../vendor/state/index"));

var _index2 = _interopRequireDefault(require("../../vendor/router/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = new _index2["default"]('.app');

function checkForAuth(url) {
  if (!_index["default"].get('auth').id) {
    _authApi["default"].request().then(function (res) {
      _index["default"].set('auth', res.response);

      if (_index["default"].checkForAuth()) {
        router.go(url);
      } else {
        router.go('/');
      }
    })["catch"](function (err) {
      console.log(err);
    });
  }
}

var _default = checkForAuth;
exports["default"] = _default;