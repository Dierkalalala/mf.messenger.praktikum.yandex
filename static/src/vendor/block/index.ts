import EventBus from '../eventbus/index';
interface Prop {
    [items: string] : unknown
}


interface ProxyConstructor {
    revocable<T extends object>(target: T, handler: ProxyHandler<T>): { proxy: T; revoke: () => void; };
    new <T extends object>(target: T, handler: ProxyHandler<T>): T;
}
declare var Proxy: ProxyConstructor;




class Block {
    props: Prop;
    eventBus: EventBus

    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_RENDER: "flow:render",
        FLOW_CDU: "flow:component-did-update",
    };

    _element : HTMLElement;
    _meta : {
        tagName: string,
        props: Prop
    };
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName: string = "div", props = {}) {
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }



    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount(this.props);

        this._render();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps : Prop) {
        return oldProps
    }

    _componentDidUpdate(oldProps: Prop, newProps: Prop) {
        const response = this.componentDidUpdate(oldProps, newProps);
        void response;
        this._render();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps : Prop, newProps : Prop) {
        return [oldProps, newProps];
    }

    setProps = (nextProps: Prop) => {
        if (!nextProps) {
            return;
        }

        (<any>Object).assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    _render() {
        const block = this.render();
        let divElement = document.createElement('div') as HTMLElement;
        this._element.innerHTML = '';
        divElement.innerHTML =  block;


        this._element.appendChild(divElement);

        return this._element;
    }

    renderTo(root: HTMLElement):void {
        void root;
    }

    // Может переопределять пользователь, необязательно трогать
    render(): string {
        return '123';
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: Prop) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;

        props = new Proxy(props, {
            get(target: Prop, prop: string) {
                return target[prop]
            },
            set(target:Prop, prop:string, newValue: {[name: string] : unknown}) {
                target[prop] = newValue;
                self.eventBus.emit(Block.EVENTS.FLOW_CDU)
                return true
            },
            deleteProperty(target:Prop, prop:string) {
                void target;
                void prop;
                throw new Error('нет доступа')
            }
        })

        return props;
    }

    _createDocumentElement(tagName : string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.element.style.display = 'block'
    }

    hide() {
        this.element.style.display = 'none'
    }
}
export default Block;
