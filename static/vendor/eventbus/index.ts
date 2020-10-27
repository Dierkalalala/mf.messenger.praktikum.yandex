interface Listeners {
    [name: string]: [Function] | Function[]
}

class EventBus {
    listeners: Listeners;

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: Function): void {
        if (this.listeners[event] === undefined) {
            this.listeners[event] = [callback];
            return;
        }
        this.listeners[event].push(callback);
    }

    off(event: string, callback: Function): void {
        this._checkEventForExisence(event);
        if (this.listeners[event] !== undefined) {
            this.listeners[event] = this.listeners[event].filter((ecallback: Function) => ecallback !== callback);
        }
    }

    emit(event: string, ...args: Array<string | number | HTMLAllCollection | boolean>): void {
        this._checkEventForExisence(event);
        this.listeners[event].forEach((callback: Function) => {
            let callbackFunction = callback.bind(null, ...args)
            callbackFunction();
        })

    }

    _checkEventForExisence(event: string): void {
        if (this.listeners[event] == undefined) {
            throw new Error(`Нет события ${event}`)
        }
    }
}

export default EventBus
