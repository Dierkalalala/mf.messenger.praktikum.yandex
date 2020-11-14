function hello (string: string): string {
    return `Hello ${string}`;
}
import { expect } from "chai";



describe("Typescript + Babel usage suite", () => {
    it("should return string correctly", () => {
        expect(hello("mocha"), "Hello mocha");
    });
});
