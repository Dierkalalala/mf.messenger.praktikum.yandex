class EventBus {
    constructor() {
        this.listeners = {};
    }
    on(event, callback) {
        if (this.listeners[event] === undefined) {
            this.listeners[event] = [callback];
            return;
        }
        this.listeners[event].push(callback);
    }
    off(event, callback) {
        this._checkEventForExisence(event);
        if (this.listeners[event] !== undefined) {
            this.listeners[event] = this.listeners[event].filter((ecallback) => ecallback !== callback);
        }
    }
    emit(event, ...args) {
        this._checkEventForExisence(event);
        this.listeners[event].forEach((callback) => {
            let callbackFunction = callback.bind(null, ...args);
            callbackFunction();
        });
    }
    _checkEventForExisence(event) {
        if (this.listeners[event] == undefined) {
            throw new Error(`Нет события ${event}`);
        }
    }
}
export default EventBus;
//# sourceMappingURL=index.js.map