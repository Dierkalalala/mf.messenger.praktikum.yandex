"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatsApi = exports.UserApi = exports.AuthApi = void 0;

var _baseUrl = _interopRequireDefault(require("./baseUrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var METHODS = {
  GET: 'GET',
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};

function queryStringify(data) {
  return Object.entries(data).reduce(function (acc, res) {
    var keyName = res[0];
    var keyValue = res[1];
    return acc + "".concat(keyName, "=").concat(keyValue.toString(), "&");
  }, '?');
}

function convert(str) {
  return str.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
}

var HTTPTransport = function HTTPTransport(prefix) {
  var _this = this;

  _classCallCheck(this, HTTPTransport);

  _defineProperty(this, "prefix", void 0);

  _defineProperty(this, "baseUrl", _baseUrl["default"]);

  _defineProperty(this, "get", function (url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return _this.request(url, _objectSpread(_objectSpread({}, options), {}, {
      method: METHODS.GET
    }), options.timeout);
  });

  _defineProperty(this, "post", function (url, options) {
    return _this.request(url, _objectSpread(_objectSpread({}, options), {}, {
      method: METHODS.POST
    }), options.timeout);
  });

  _defineProperty(this, "put", function (url, options) {
    return _this.request(url, _objectSpread(_objectSpread({}, options), {}, {
      method: METHODS.PUT
    }), options.timeout);
  });

  _defineProperty(this, "delete", function (url, options) {
    return _this.request(url, _objectSpread(_objectSpread({}, options), {}, {
      method: METHODS.DELETE
    }), options.timeout);
  });

  _defineProperty(this, "request", function (url, options) {
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;
    var headers = options.headers,
        data = options.data,
        method = options.method;
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();

      if (method == METHODS.GET) {
        if (options.data !== undefined) {
          url += queryStringify(options.data);
          url = url.substr(0, url.length - 1);
        }
      }

      xhr.open(method, _this.baseUrl + _this.prefix + url);

      if (headers) {
        Object.entries(headers).forEach(function (header) {
          var headerKey = header[0];
          var headerValue = header[1];
          xhr.setRequestHeader(headerKey, headerValue);
        });
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (data !== undefined) {
        data = convert(data);
      }

      if (method == METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(options.data);
      }
    });
  });

  this.prefix = prefix;
};

var AuthApi = new HTTPTransport('/auth');
exports.AuthApi = AuthApi;
var UserApi = new HTTPTransport('/user');
exports.UserApi = UserApi;
var ChatsApi = new HTTPTransport('/chats');
exports.ChatsApi = ChatsApi;