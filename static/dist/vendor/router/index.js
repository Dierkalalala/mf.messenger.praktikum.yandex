"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../route/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Router = /*#__PURE__*/function () {
  function Router(rootQuery) {
    _classCallCheck(this, Router);

    _defineProperty(this, "routes", void 0);

    _defineProperty(this, "history", void 0);

    _defineProperty(this, "_currentRoute", void 0);

    _defineProperty(this, "_rootQuery", void 0);

    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  _createClass(Router, [{
    key: "use",
    value: function use(pathname, block) {
      var route = new _index["default"](pathname, block, {
        rootQuery: this._rootQuery
      });
      this.routes.push(route);
      return this;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      window.onpopstate = function (event) {
        var currentTarget = event.currentTarget;

        if (currentTarget.location !== null) {
          var location = currentTarget.location.pathname;

          _this._onRoute(location);
        }
      };

      if (document.location !== null) {
        this._onRoute(document.location.pathname);
      }
    }
  }, {
    key: "_onRoute",
    value: function _onRoute(pathname) {
      var route = this.getRoute(pathname);

      if (this._currentRoute && this._currentRoute._pathname !== pathname) {
        this._currentRoute.leave();
      }

      if (route === undefined) {
        this._currentRoute = this.routes[0];
        this.go('/404');
        return;
      }

      this._currentRoute = route;
      route.render();
    }
  }, {
    key: "go",
    value: function go(pathname) {
      if (this._currentRoute !== null) {
        this.history.pushState(this._currentRoute._pathname, pathname, pathname);

        this._onRoute(pathname);
      }
    }
  }, {
    key: "back",
    value: function back() {
      this.history.back();
    }
  }, {
    key: "forward",
    value: function forward() {
      this.history.forward();
    }
  }, {
    key: "getRoute",
    value: function getRoute(pathname) {
      return this.routes.find(function (route) {
        return route.match(pathname);
      });
    }
  }]);

  return Router;
}();

_defineProperty(Router, "__instance", void 0);

var _default = Router;
exports["default"] = _default;