import Block from '../block/'
import LogInPage from '../../src/pages/signIn/'


interface Prop {
    [items: string] : unknown
}

function isEqual(lhs : string , rhs : string) {
    return lhs === rhs;
}

class Route{
    _pathname: string;
    _blockClass: Block;
    _block: LogInPage | null;
    _props: Prop;
    __root: HTMLElement
    constructor(pathname : string, view: Block, props: Prop) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
        this.__root = document.querySelector( (this._props.rootQuery as string) ) as HTMLElement;
    }

    navigate(pathname : string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            (this._block as Block).hide();
        }
    }

    match(pathname : string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            this._block!.renderTo(this.__root);
            return;
        }

        this._block.show();
    }
}
export default Route
