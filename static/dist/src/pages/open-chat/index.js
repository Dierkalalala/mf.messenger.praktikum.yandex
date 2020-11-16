"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = _interopRequireDefault(require("../../../vendor/block/index"));

var _index2 = _interopRequireDefault(require("../../components/chat-sidebar/index"));

var _template = _interopRequireDefault(require("./template"));

var _index3 = _interopRequireDefault(require("../../../vendor/state/index"));

var _index4 = _interopRequireDefault(require("../../../vendor/router/index"));

var _chatsApi = _interopRequireDefault(require("../../api/chats-api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = new _index4["default"]('.app');

var openChatPage = /*#__PURE__*/function (_Block) {
  _inherits(openChatPage, _Block);

  var _super = _createSuper(openChatPage);

  function openChatPage() {
    var _this;

    _classCallCheck(this, openChatPage);

    _this = _super.call(this, 'div');

    _defineProperty(_assertThisInitialized(_this), "openChatPageElement", void 0);

    _defineProperty(_assertThisInitialized(_this), "sidebar", void 0);

    _this.openChatPageElement = document.createElement('div');
    return _this;
  }

  _createClass(openChatPage, [{
    key: "registerEvents",
    value: function registerEvents() {
      this.eventBus.on(_index["default"].EVENTS.FLOW_CDU, this.updateChat.bind(this));
    }
  }, {
    key: "checkForActiveChat",
    value: function checkForActiveChat() {
      if (_index3["default"].get('activeChat').id === null || !_index3["default"].get('activeChat').id) {
        router.go('/no-chat');
      }
    }
  }, {
    key: "show",
    value: function show() {
      _get(_getPrototypeOf(openChatPage.prototype), "show", this).call(this);
    }
  }, {
    key: "_fetchData",
    value: function _fetchData() {
      var chatsPromise = new Promise(function (resolve, reject) {
        if (_index3["default"].get('chats').activeChats) {
          resolve(_index3["default"].chats);
        } else {
          _chatsApi["default"].getAllChats().then(function (res) {
            _index3["default"].set('chats', {
              activeChats: res.response
            });

            resolve(res.response);
          })["catch"](function (err) {
            reject(err);
          });
        }
      });
      var chatPromise = new Promise(function (resolve, reject) {
        _chatsApi["default"].getChatUsers(_index3["default"].get('activeChat').id).then(function (res) {
          resolve(res.response);
        })["catch"](function (err) {
          return reject(err);
        });
      });
      return Promise.all([chatsPromise, chatPromise]);
    }
  }, {
    key: "render",
    value: function render() {
      return Mustache.render(_template["default"], this.props);
    }
  }, {
    key: "getDataForChatUpdate",
    value: function getDataForChatUpdate() {
      return new Promise(function (resolve, reject) {
        _chatsApi["default"].getChatUsers(_index3["default"].get('activeChat').id).then(function (res) {
          resolve(res.response);
        })["catch"](function (err) {
          return reject(err);
        });
      });
    }
  }, {
    key: "updateChat",
    value: function updateChat() {
      var _this2 = this;

      if (!_index3["default"].get('activeChat').id) {
        return;
      }

      this.getDataForChatUpdate().then(function (res) {
        _this2.sidebar = new _index2["default"]({
          chats: _index3["default"].get('chats').activeChats
        }); // this.MessagesBlock = new messages({
        //
        // });

        _this2.props = Object.assign(Object.assign({}, _this2.props), {
          components: {
            sidebar: _this2.sidebar.render()
            /*messages: this.MessagesBlock.render()*/

          },
          data: {
            chat: {
              name: 'Вадим',
              time: '10:49',
              last_time: '5',
              unreadMessages: 2,
              profile_img: 'assets/img/ava-sol-b4Ml2OidO6o-unsplash.jpg',
              is_last_message_your: true,
              lastMessage: 'стикер'
            },
            chatUsers: res
          }
        });

        if (openChatPage.openChatPageElement !== undefined) {
          openChatPage.openChatPageElement.innerHTML = _this2._render().innerHTML;
        }
      })["catch"](function (err) {
        console.log(err);
      });
    }
  }, {
    key: "renderTo",
    value: function renderTo(rootElement) {
      var _this3 = this;

      this.checkForActiveChat();
      this.registerEvents();

      this._fetchData().then(function (res) {
        _this3.sidebar = new _index2["default"]({
          chats: res[0]
        });
        /* this.MessagesBlock = new messages({
           });*/

        _this3.props = Object.assign(Object.assign({}, _this3.props), {
          components: {
            sidebar: _this3.sidebar.render()
            /*messages: this.MessagesBlock.render()*/

          },
          data: {
            chat: {
              name: 'Вадим',
              time: '10:49',
              last_time: '5',
              unreadMessages: 2,
              profile_img: 'assets/img/ava-sol-b4Ml2OidO6o-unsplash.jpg',
              is_last_message_your: true,
              lastMessage: 'стикер'
            },
            chatUsers: res[1]
          }
        });
        openChatPage.openChatPageElement = _this3._render();
        rootElement.appendChild(openChatPage.openChatPageElement);
        var createNewChatButton = document.querySelector('-create-new-chat');
        createNewChatButton.addEventListener('submit', function (e) {
          e.preventDefault();
          var target = e.target;
          var targetInputTitle = target.title;
          var data = JSON.stringify({
            title: targetInputTitle
          });

          _chatsApi["default"].createChat(data).then(function (res) {
            if (res.status === 200) {
              _chatsApi["default"].getAllChats().then(function (res) {
                _index3["default"].set('chats', res.response);

                _this3.setProps({
                  chats: res.response
                });

                _this3.registerEvents();
              })["catch"](function (err) {
                return console.log(err);
              });
            }
          })["catch"](function (err) {
            return console.log(err);
          });
        });
        document.addEventListener('click', function (e) {
          var path = e.composedPath();
          path.pop();
          path.pop();
          var activaChat = Array.from(path).find(function (el) {
            return el.matches('[data-chat-id]');
          });

          if (activaChat !== undefined) {
            e.stopImmediatePropagation();
            e.stopPropagation();

            _index3["default"].set('activeChat', {
              id: activaChat.getAttribute('data-chat-id')
            });

            router.go('/open-chat');
            return false;
          }

          var deleteButton = Array.from(path).find(function (el) {
            return el.matches('-delete-user');
          });

          if (deleteButton) {
            var data = JSON.stringify({
              users: [deleteButton.getAttribute('data-id')],
              chatId: _index3["default"].get('activeChat').id
            });

            _chatsApi["default"].deleteChatUser(data).then(function (res) {
              console.log(res);
            })["catch"](function (err) {
              return console.log(err);
            });
          }
        });
        var addUserForm = document.querySelector('#add-user-form');
        addUserForm.addEventListener('submit', function (e) {
          e.preventDefault();
          var userIdInput = e.target.user_id;
          var data = JSON.stringify({
            users: [userIdInput.value],
            chatId: _index3["default"].get('activeChat').id
          });

          _chatsApi["default"].addUserToChat(data).then(function (res) {
            return console.log(res);
          })["catch"](function (err) {
            return console.log(err);
          });
        });
      });
    }
  }]);

  return openChatPage;
}(_index["default"]);

var _default = new openChatPage();

exports["default"] = _default;