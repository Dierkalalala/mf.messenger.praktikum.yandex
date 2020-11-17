import Block from "../block";

interface Prop {
    rootQuery: string
}

interface PageComponent extends Block {
    renderTo(root: HTMLElement): void;
}

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

class Route {
    _pathname: string;
    _block: PageComponent;
    _props: Prop;
    _isRendered: boolean;
    __root: HTMLElement | null;


    constructor(pathname: string, view: PageComponent, props: Prop) {
        this._pathname = pathname;
        this._block = view;
        this._props = props;
        this._isRendered = false;
        this.__root = document.querySelector(this._props.rootQuery);
        if (this.__root === null) {
            throw new Error('Кореневая директория не найдена')
        }
    }

    navigate(pathname: string) {
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

    match(pathname: string) {
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

export default Route
