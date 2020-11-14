import { expect } from "chai";
import * as Mustache from '../static/typings/mustache';
/*import * as Mustache from "../static/typings/mustache/index.js";*/
import '../static/vendor/templator/index.js';

describe("Шаблонизатор", () => {
    it("Шаблонизатор должен вернуть html строку с данными", () => {
        // @ts-ignore
        expect(Mustache.render('<div>{{word}} World</div>', {word: "Hello"}), '<div>Hello World</div>');
    });
});
