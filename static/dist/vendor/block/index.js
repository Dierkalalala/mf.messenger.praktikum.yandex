import EventBus from '../eventbus/index.js';
class Block {
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
        this.setProps = (nextProps) => {
            if (!nextProps) {
                return;
            }
            Object.assign(this.props, nextProps);
        };
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
    _registerEvents(eventBus) {
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
    componentDidMount(oldProps) {
        return oldProps;
    }
    _componentDidUpdate(oldProps, newProps) {
        const response = this.componentDidUpdate(oldProps, newProps);
        void response;
        this._render();
    }
    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
        return [oldProps, newProps];
    }
    get element() {
        return this._element;
    }
    _render() {
        const block = this.render();
        let divElement = document.createElement('div');
        this._element.innerHTML = '';
        divElement.innerHTML = block;
        this._element.appendChild(divElement);
        return this._element;
    }
    renderTo(root) {
        void root;
    }
    // Может переопределять пользователь, необязательно трогать
    render() {
        return '123';
    }
    getContent() {
        return this.element;
    }
    _makePropsProxy(props) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;
        props = new Proxy(props, {
            get(target, prop) {
                return target[prop];
            },
            set(target, prop, newValue) {
                target[prop] = newValue;
                self.eventBus.emit(Block.EVENTS.FLOW_CDU);
                return true;
            },
            deleteProperty(target, prop) {
                void target;
                void prop;
                throw new Error('нет доступа');
            }
        });
        return props;
    }
    _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }
    show() {
        this.element.style.display = 'block';
    }
    hide() {
        this.element.style.display = 'none';
    }
}
Block.EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
};
export default Block;
//# sourceMappingURL=index.js.map