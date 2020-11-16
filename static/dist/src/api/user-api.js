"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _baseApi = _interopRequireDefault(require("./baseApi"));

var _httpTransport = require("./httpTransport");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var headers = {
  "Content-type": "application/json"
};

var UserApiClass = /*#__PURE__*/function (_BaseApi) {
  _inherits(UserApiClass, _BaseApi);

  var _super = _createSuper(UserApiClass);

  function UserApiClass() {
    _classCallCheck(this, UserApiClass);

    return _super.apply(this, arguments);
  }

  _createClass(UserApiClass, null, [{
    key: "changeUserProfile",
    value: function changeUserProfile(userData) {
      return _httpTransport.UserApi.put('/profile', {
        data: userData,
        headers: headers
      });
    }
  }, {
    key: "changeUserAvatar",
    value: function changeUserAvatar(avatar) {
      return _httpTransport.UserApi.put('/profile/avatar', {
        data: avatar,
        headers: headers
      });
    }
  }, {
    key: "changeUserPassword",
    value: function changeUserPassword(userData) {
      return _httpTransport.UserApi.put('/password', {
        data: userData,
        headers: headers
      });
    }
  }, {
    key: "getUserById",
    value: function getUserById(id) {
      return _httpTransport.UserApi.get("/".concat(id));
    }
  }, {
    key: "searchForUsers",
    value: function searchForUsers(userData) {
      return _httpTransport.UserApi.post('/search', {
        data: userData,
        headers: headers
      });
    }
  }]);

  return UserApiClass;
}(_baseApi["default"]);

var _default = UserApiClass;
exports["default"] = _default;