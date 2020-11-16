"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../../components/sidebar/index"));

var _index2 = _interopRequireDefault(require("../../components/button/index"));

var _template = _interopRequireDefault(require("./template"));

var _Validation = _interopRequireDefault(require("../../../src/module/Validation"));

var _form_handler = _interopRequireDefault(require("../../../src/module/form_handler"));

var _index3 = _interopRequireDefault(require("../../../vendor/block/index"));

var _userApi = _interopRequireDefault(require("../../api/user-api"));

var _index4 = _interopRequireDefault(require("../../../vendor/state/index"));

var _isAuth = _interopRequireDefault(require("../../module/isAuth"));

var _index5 = _interopRequireDefault(require("../../../vendor/router/index"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = new _index5["default"]('.app');

var ProfileEditPage = /*#__PURE__*/function (_Block) {
  _inherits(ProfileEditPage, _Block);

  var _super = _createSuper(ProfileEditPage);

  function ProfileEditPage() {
    var _this;

    _classCallCheck(this, ProfileEditPage);

    _this = _super.call(this, 'div');

    _defineProperty(_assertThisInitialized(_this), "rootElement", void 0);

    _defineProperty(_assertThisInitialized(_this), "profilePageElement", void 0);

    _defineProperty(_assertThisInitialized(_this), "savePersonalDataButton", void 0);

    _defineProperty(_assertThisInitialized(_this), "savePasswordButton", void 0);

    _defineProperty(_assertThisInitialized(_this), "sidebar", void 0);

    _this.rootElement = document.querySelector('.app');

    if (_this.rootElement === null) {
      throw new Error('Корневого элемента не существует');
    }

    _this.profilePageElement = document.createElement('div');

    _this.registerEvents();

    return _this;
  }

  _createClass(ProfileEditPage, [{
    key: "registerEvents",
    value: function registerEvents() {
      this.eventBus.on(_index3["default"].EVENTS.INIT, this.getData.bind(this));
      this.eventBus.on(_index3["default"].EVENTS.FLOW_CDU, this.renderTo.bind(this));
    }
  }, {
    key: "getData",
    value: function getData() {
      (0, _isAuth["default"])('/profile/edit');
    }
  }, {
    key: "hide",
    value: function hide() {
      ProfileEditPage.profilePageElement.style.display = 'none';
    }
  }, {
    key: "show",
    value: function show() {
      ProfileEditPage.profilePageElement.style.display = 'block';
    }
  }, {
    key: "_fetchData",
    value: function _fetchData() {
      return new Promise(function (resolve, reject) {
        (0, _isAuth["default"])('/profile/edit');

        _userApi["default"].getUserById(_index4["default"].auth.id).then(function (res) {
          return resolve(res);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return Mustache.render(_template["default"], this.props);
    }
  }, {
    key: "renderTo",
    value: function renderTo() {
      var _this2 = this;

      this._fetchData().then(function (res) {
        _this2.savePersonalDataButton = new _index2["default"]({
          type: 'submit',
          className: 'default-button',
          text: 'Сохранить'
        });
        _this2.savePasswordButton = new _index2["default"]({
          type: 'submit',
          className: 'default-button',
          text: 'Изменить пароль'
        });
        _this2.sidebar = new _index["default"]({
          href: '/profile'
        });
        _this2.props = Object.assign(Object.assign({}, _this2.props), {
          components: {
            sidebar: _this2.sidebar.render(),
            saveButton: _this2.savePersonalDataButton.render(),
            savePassButton: _this2.savePasswordButton.render()
          },
          name: res.response.first_name,
          profile_img: '',
          details: [{
            name: 'Имя',
            input: {
              name: 'first_name',
              type: 'text',
              placeholder: 'Имя'
            }
          }, {
            name: 'Фамилия',
            input: {
              name: 'second_name',
              type: 'text',
              placeholder: 'Фамилия'
            }
          }, {
            name: 'Имя в приложении',
            input: {
              name: 'display_name',
              type: 'text',
              placeholder: 'Имя в приложении'
            }
          }, {
            name: 'Почта',
            input: {
              name: 'email',
              type: 'email',
              placeholder: 'Почта'
            }
          }, {
            name: 'Логин',
            input: {
              name: 'login',
              type: 'text',
              placeholder: 'Логин'
            }
          }, {
            name: 'Номер телефона',
            input: {
              name: 'phone',
              type: 'tel',
              placeholder: 'Номер телефона'
            }
          }],
          passwordData: [{
            name: 'Новый пароль',
            input: {
              name: 'newPassword',
              type: 'password',
              placeholder: 'Введите'
            }
          }, {
            name: 'Старый пароль',
            input: {
              name: 'oldPassword',
              type: 'password',
              placeholder: 'Введите'
            }
          }]
        });

        try {
          _this2.rootElement.removeChild(ProfileEditPage.profilePageElement);
        } catch (e) {
          console.log('not deleted');
        }

        ProfileEditPage.profilePageElement = _this2._render();

        _this2.rootElement.appendChild(ProfileEditPage.profilePageElement);

        ProfileEditPage.profilePageElement.style.display = 'none';

        if (router._currentRoute._pathname === '/profile/edit') {
          ProfileEditPage.profilePageElement.style.display = 'block';
        }

        var inputs = {
          login: {
            required: true
          },
          first_name: {
            required: true
          },
          second_name: {
            required: true
          },
          email: {
            required: true,
            email: true
          },
          newPassword: {
            required: true,
            minLength: 6
          },
          oldPassword: {
            required: true,
            minLength: 6
          },
          phone: {
            required: true,
            minLength: 10
          },
          display_name: {
            required: true
          }
        };

        _Validation["default"].validate(inputs);

        var forms = document.querySelectorAll('form');
        Array.from(forms).forEach(function (form) {
          form.addEventListener('submit', function (e) {
            var isValidData = (0, _form_handler["default"])(e);

            if (isValidData) {
              var object = {};
              isValidData.forEach(function (value, key) {
                object[key] = value;
              });
              var json = JSON.stringify(object);

              _userApi["default"].changeUserProfile(json).then(function (res) {
                if (res.status === 200) {
                  _index4["default"].set('auth', res.response);

                  _index4["default"].set('users', res.response);

                  router.go('/profile');
                }
              })["catch"](function (err) {
                console.log(err);
              });
            }
          });
        });
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }]);

  return ProfileEditPage;
}(_index3["default"]);

var _default = new ProfileEditPage();

exports["default"] = _default;