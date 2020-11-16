"use strict";

var _index = _interopRequireDefault(require("../src/pages/404/index"));

var _index2 = _interopRequireDefault(require("../src/pages/500/index"));

var _index3 = _interopRequireDefault(require("../src/pages/signIn/index"));

var _index4 = _interopRequireDefault(require("../src/pages/signUp/index"));

var _index5 = _interopRequireDefault(require("../vendor/router/index"));

var _index6 = _interopRequireDefault(require("../src/pages/no-chat/index"));

var _index7 = _interopRequireDefault(require("../src/pages/profile/index"));

var _index8 = _interopRequireDefault(require("../src/pages/open-chat/index"));

var _index9 = _interopRequireDefault(require("../src/pages/profile-edit/index"));

var _modal = _interopRequireDefault(require("../src/module/modal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

new _modal["default"]();
var router = new _index5["default"](".app");
router.use("/404", _index["default"]).use("/500", _index2["default"]).use('/', _index3["default"]).use('/sign-up', _index4["default"]).use('/no-chat', _index6["default"]).use('/open-chat', _index8["default"]).use('/profile', _index7["default"]).use('/profile/edit', _index9["default"]).start();
document.addEventListener('click', clickToLink);

function clickToLink(e) {
  var path = e.composedPath();
  path.pop();
  path.pop();
  var isAnchor = Array.from(path).find(function (el) {
    try {
      if (el.matches('[href]')) {
        return el;
      }
    } catch (e) {
      console.log(e);
    }
  });

  if (isAnchor) {
    e.preventDefault();
    router.go(isAnchor.getAttribute('href'));
  }
}