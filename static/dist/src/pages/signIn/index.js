"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../../components/button/index"));

var _template = _interopRequireDefault(require("./template"));

var _index2 = _interopRequireDefault(require("../../../vendor/block/index"));

var _Validation = _interopRequireDefault(require("../../../src/module/Validation"));

var _form_handler = _interopRequireDefault(require("../../../src/module/form_handler"));

var _authApi = _interopRequireDefault(require("../../api/auth-api"));

var _isAuth = _interopRequireDefault(require("../../../src/module/isAuth"));

var _placeholder = _interopRequireDefault(require("../../../src/module/placeholder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var signInPage = /*#__PURE__*/function (_Block) {
  _inherits(signInPage, _Block);

  var _super = _createSuper(signInPage);

  _createClass(signInPage, [{
    key: "hide",
    value: function hide() {
      if (this.rootElement !== null) {
        this.rootElement.removeChild(this._render());
      }
    }
  }, {
    key: "show",
    value: function show() {
      if (this.rootElement !== null) {
        this.renderTo(this.rootElement);
      }
    }
  }]);

  function signInPage() {
    var _this;

    _classCallCheck(this, signInPage);

    _this = _super.call(this, 'div');

    _defineProperty(_assertThisInitialized(_this), "button", void 0);

    _defineProperty(_assertThisInitialized(_this), "inputs", void 0);

    _defineProperty(_assertThisInitialized(_this), "rootElement", void 0);

    _this.registerListeners();

    _this.button = new _index["default"]({
      type: 'submit',
      className: 'default-button',
      text: 'Авторизоваться'
    });
    _this.inputs = {
      login: {
        required: true
      },
      password: {
        required: true,
        minLength: 6
      }
    };
    return _this;
  }

  _createClass(signInPage, [{
    key: "registerListeners",
    value: function registerListeners() {
      this.eventBus.on(_index2["default"].EVENTS.FLOW_CDU, this.show.bind(this));
    }
  }, {
    key: "_fetchData",
    value: function _fetchData() {
      this.props = Object.assign(Object.assign({}, this.props), {
        code: 404,
        components: {
          button: this.button.render()
        },
        pageTitile: 'Вход',
        inputs: [{
          name: 'login',
          type: 'text',
          placeholder: 'Почта'
        }, {
          name: 'password',
          type: 'password',
          placeholder: 'Пароль'
        }],
        reason: ''
      });
    }
  }, {
    key: "render",
    value: function render() {
      return Mustache.render(_template["default"], this.props);
    }
  }, {
    key: "renderTo",
    value: function renderTo(rootElement) {
      var _this2 = this;

      (0, _isAuth["default"])('/profile');
      this.rootElement = rootElement;

      this._fetchData();

      rootElement.appendChild(this._render());

      _Validation["default"].validate(this.inputs);

      var inputControls = Array.from(document.querySelectorAll('.js-input-control'));
      new _placeholder["default"](inputControls);
      var forms = document.querySelectorAll('.js-sign-in-form');
      Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (e) {
          var isValidData = (0, _form_handler["default"])(e);

          if (isValidData) {
            var object = {};
            isValidData.forEach(function (value, key) {
              object[key] = value;
            });
            var json = JSON.stringify(object);

            _authApi["default"].signIn(json).then(function (resp) {
              if (resp.status === 401) {
                _this2.props = _objectSpread(_objectSpread({}, _this2.props), {}, {
                  reason: resp.response.reason
                });

                _this2.eventBus.emit(_index2["default"].EVENTS.FLOW_CDU);
              }

              if (resp.status === 200) {
                (0, _isAuth["default"])('/profile');
              }
            })["catch"](function (err) {
              console.log(err);
            });
          }
        });
      });
    }
  }]);

  return signInPage;
}(_index2["default"]);

var _default = new signInPage();

exports["default"] = _default;