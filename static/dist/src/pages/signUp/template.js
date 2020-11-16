"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var pageTemplate = "\n        <div class=\"page-center\">\n        <div class=\"auth-form-wrapper\">\n            <form action=\"\" method=\"post\">\n                <div class=\"upper-form-block\">\n                    <h1 class=\"form-title\">\n                        {{pageTitile}}\n                    </h1>\n                    {{#inputs}}\n                        <label>\n                            <input name=\"{{name}}\" type=\"{{type}}\" class=\"js-input-control\">\n                            <span class=\"input-placeholder\">{{placeholder}}</span>\n                            <span class=\"input-error\"></span>\n                        </label>\n                    {{/inputs}}\n                </div>\n                <div class=\"auth-error\">{{reason}}</div>\n                \n                <div class=\"auth-form-buttons-wrapper\">\n                     {{{ components.button }}}\n                    <div class=\"text-center\">\n                        <a href=\"/\" class=\"default-link\">\n                            \u0415\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442?\n                        </a>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n    ";
var _default = pageTemplate;
exports["default"] = _default;