import { expect } from "chai";

const Mustache = require('../static/src/vendor/templator/index.js');

describe("Шаблонизатор", () => {
    it("Шаблонизатор должен вернуть html строку с данными", () => {
        expect(Mustache.render('<div>{{word}} World</div>', {word: "Hello"}), '<div>Hello World</div>');
    });
});
