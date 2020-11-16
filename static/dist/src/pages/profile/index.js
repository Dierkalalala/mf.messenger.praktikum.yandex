"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../../../vendor/state/index"));

var _index2 = _interopRequireDefault(require("../../components/sidebar/index"));

var _template = _interopRequireDefault(require("./template"));

var _index3 = _interopRequireDefault(require("../../../vendor/block/index"));

var _index4 = _interopRequireDefault(require("../../../vendor/router/index"));

var _authApi = _interopRequireDefault(require("../../../src/api/auth-api"));

var _isAuth = _interopRequireDefault(require("../../module/isAuth"));

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

var router = new _index4["default"]('.app');

function signOut() {
  _authApi["default"].logOut().then(function () {
    _index["default"].clearAll();

    (0, _isAuth["default"])('/profile');
  })["catch"](function (err) {
    return console.log(err);
  });
}

var ProfilePage = /*#__PURE__*/function (_Block) {
  _inherits(ProfilePage, _Block);

  var _super = _createSuper(ProfilePage);

  function ProfilePage() {
    var _this;

    _classCallCheck(this, ProfilePage);

    _this = _super.call(this, 'div');

    _defineProperty(_assertThisInitialized(_this), "rootElement", void 0);

    _defineProperty(_assertThisInitialized(_this), "profilePageElement", void 0);

    _defineProperty(_assertThisInitialized(_this), "sidebar", void 0);

    _this.rootElement = document.querySelector('.app');

    if (_this.rootElement === null) {
      throw new Error('Корневого элемента не существует');
    }

    _this.profilePageElement = document.createElement('div');

    _this.registerEvents();

    return _this;
  }

  _createClass(ProfilePage, [{
    key: "registerEvents",
    value: function registerEvents() {
      this.eventBus.on(_index3["default"].EVENTS.FLOW_CDU, this.renderTo.bind(this));
    }
  }, {
    key: "hide",
    value: function hide() {
      try {
        ProfilePage.profilePageElement.style.display = 'none';
      } catch (e) {
        void e;
      }
    }
  }, {
    key: "show",
    value: function show() {
      try {
        ProfilePage.profilePageElement.style.display = 'block';
      } catch (e) {
        void e;
      }
    }
  }, {
    key: "_fetchData",
    value: function _fetchData() {
      return new Promise(function (resolve, reject) {
        if (_index["default"].auth.hasOwnProperty('id')) {
          resolve(_index["default"].auth);
        } else {
          reject('error');
        }
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
        _this2.sidebar = new _index2["default"]({
          href: '/no-chat'
        });
        _this2.props = Object.assign(Object.assign({}, _this2.props), {
          components: {
            sidebar: _this2.sidebar.render()
          },
          name: res.first_name,
          profile_img: res.avatar,
          details: [{
            name: 'Почта',
            value: res.email
          }, {
            name: 'Логин',
            value: res.login
          }]
        });

        try {
          _this2.rootElement.removeChild(ProfilePage.profilePageElement);
        } catch (e) {
          console.log('not deleter');
        }

        ProfilePage.profilePageElement = _this2._render();

        _this2.rootElement.appendChild(ProfilePage.profilePageElement);

        ProfilePage.profilePageElement.style.display = 'none';

        if (router._currentRoute._pathname === '/profile') {
          ProfilePage.profilePageElement.style.display = 'block';
        }

        var signOutButton = document.querySelector('-sign-out');
        signOutButton.addEventListener('click', signOut.bind(_this2));
      })["catch"](function (err) {
        console.log(err);
        router.go('/');
      });
    }
  }]);

  return ProfilePage;
}(_index3["default"]);

var _default = new ProfilePage();

exports["default"] = _default;