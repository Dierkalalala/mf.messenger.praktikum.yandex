function isEqual(lhs, rhs) {
    return lhs === rhs;
}
class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._block = view;
        this._props = props;
        this._isRendered = false;
        this.__root = document.querySelector(this._props.rootQuery);
        if (this.__root === null) {
            throw new Error('Кореневая директория не найдена');
        }
    }
    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }
    leave() {
        if (this._block) {
            this._block.hide();
        }
    }
    match(pathname) {
        return isEqual(pathname, this._pathname);
    }
    render() {
        if (!this._isRendered) {
            if (this.__root !== null) {
                this._block.renderTo(this.__root);
                this._block.show();
            }
            return;
        }
        this._block.show();
    }
}
export default Route;
//# sourceMappingURL=index.js.map