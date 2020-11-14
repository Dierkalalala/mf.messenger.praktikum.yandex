function isEqual(lhs, rhs) {
    return lhs === rhs;
}
class Route {
    constructor(pathname, view, props) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
        this.__root = document.querySelector(this._props.rootQuery);
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
        if (!this._block) {
            this._block = new this._blockClass();
            this._block.renderTo(this.__root);
            return;
        }

        this._block.show();
    }
}
export default Route;
