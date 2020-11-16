"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../eventbus/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Block = /*#__PURE__*/function () {
  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  function Block() {
    var _this = this;

    var tagName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "div";
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Block);

    _defineProperty(this, "props", void 0);

    _defineProperty(this, "eventBus", void 0);

    _defineProperty(this, "_element", void 0);

    _defineProperty(this, "_meta", void 0);

    _defineProperty(this, "setProps", function (nextProps) {
      if (!nextProps) {
        return;
      }

      Object.assign(_this.props, nextProps);
    });

    var eventBus = new _index["default"]();
    this._meta = {
      tagName: tagName,
      props: props
    };
    this.props = this._makePropsProxy(props);
    this.eventBus = eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _createClass(Block, [{
    key: "_registerEvents",
    value: function _registerEvents(eventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
  }, {
    key: "_createResources",
    value: function _createResources() {
      var tagName = this._meta.tagName;
      this._element = this._createDocumentElement(tagName);
    }
  }, {
    key: "init",
    value: function init() {
      this._createResources();

      this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }
  }, {
    key: "_componentDidMount",
    value: function _componentDidMount() {
      this.componentDidMount(this.props);

      this._render();
    } // Может переопределять пользователь, необязательно трогать

  }, {
    key: "componentDidMount",
    value: function componentDidMount(oldProps) {
      return oldProps;
    }
  }, {
    key: "_componentDidUpdate",
    value: function _componentDidUpdate(oldProps, newProps) {
      var response = this.componentDidUpdate(oldProps, newProps);
      void response;

      this._render();
    } // Может переопределять пользователь, необязательно трогать

  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(oldProps, newProps) {
      return [oldProps, newProps];
    }
  }, {
    key: "_render",
    value: function _render() {
      var block = this.render();
      var divElement = document.createElement('div');
      this._element.innerHTML = '';
      divElement.innerHTML = block;

      this._element.appendChild(divElement);

      return this._element;
    }
  }, {
    key: "renderTo",
    value: function renderTo(root) {
      void root;
    } // Может переопределять пользователь, необязательно трогать

  }, {
    key: "render",
    value: function render() {
      return '123';
    }
  }, {
    key: "getContent",
    value: function getContent() {
      return this.element;
    }
  }, {
    key: "_makePropsProxy",
    value: function _makePropsProxy(props) {
      // Можно и так передать this
      // Такой способ больше не применяется с приходом ES6+
      var self = this;
      props = new Proxy(props, {
        get: function get(target, prop) {
          return target[prop];
        },
        set: function set(target, prop, newValue) {
          target[prop] = newValue;
          self.eventBus.emit(Block.EVENTS.FLOW_CDU);
          return true;
        },
        deleteProperty: function deleteProperty(target, prop) {
          void target;
          void prop;
          throw new Error('нет доступа');
        }
      });
      return props;
    }
  }, {
    key: "_createDocumentElement",
    value: function _createDocumentElement(tagName) {
      // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
      return document.createElement(tagName);
    }
  }, {
    key: "show",
    value: function show() {
      this.element.style.display = 'block';
    }
  }, {
    key: "hide",
    value: function hide() {
      this.element.style.display = 'none';
    }
  }, {
    key: "element",
    get: function get() {
      return this._element;
    }
  }]);

  return Block;
}();

_defineProperty(Block, "EVENTS", {
  INIT: "init",
  FLOW_CDM: "flow:component-did-mount",
  FLOW_RENDER: "flow:render",
  FLOW_CDU: "flow:component-did-update"
});

var _default = Block;
exports["default"] = _default;