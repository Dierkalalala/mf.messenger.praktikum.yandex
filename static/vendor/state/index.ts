import ProfilePage from '../../src/pages/profile/index.js';
import noChat from '../../src/pages/open-chat/index.js';
import openChat from '../../src/pages/no-chat/index.js';
import ProfileEditPage from "../../src/pages/profile-edit/index.js";


type Iterable = {
    [items: string] : unknown
}


class State {
    private static __instance: State;
    chats: Iterable;
    auth: Iterable
    users: Iterable;
    activeChat: Iterable
    constructor() {
        if (State.__instance) {
            return State.__instance;
        }
        this.chats = {};
        this.auth = {};
        this.users = {};
        this.activeChat = {};
        this._generateProxies();
        State.__instance = this;
    }
    _clearAllProxies() {
        this.chats = {};
        this.users = {};
        this.auth = {};
        this.activeChat = {};
    }

    _generateProxies() {
        this.chats = new Proxy(this.chats, {
            get(target: Iterable, prop: string) {
                return target[prop];
            },
            set(target: Iterable, prop: string, newValue) {
                target[prop] = newValue;
                new noChat().eventBus.emit('flow:component-did-update');
                new openChat().eventBus.emit('flow:component-did-update');
                return true;
            },
            deleteProperty(target, prop) {
                void target;
                void prop;
                throw new Error('нет доступа');
            }
        });
        this.auth = new Proxy(this.auth, {
            get(target: Iterable, prop: string) {
                return target[prop];
            },
            set(target : Iterable , prop : string, newValue) {
                target[prop] = newValue;
                new ProfilePage().eventBus.emit('flow:component-did-update');
                new ProfileEditPage().eventBus.emit('flow:component-did-update');
                return true;
            },
            deleteProperty(target, prop) {
                void target;
                void prop;
                throw new Error('нет доступа');
            }
        });
        this.users = new Proxy(this.users, {
            get(target: Iterable, prop: string) {
                return target[prop];
            },
            set(target: Iterable, prop: string, newValue) {
                console.log('set');
                target[prop] = newValue;
                new ProfilePage().eventBus.emit('flow:component-did-update');
                new ProfileEditPage().eventBus.emit('flow:component-did-update');
                return true;
            },
            deleteProperty(target: Iterable, prop: string) {
                void target;
                void prop;
                throw new Error('нет доступа');
            }
        });
        this.activeChat = new Proxy(this.activeChat, {
            get(target: Iterable, prop: string) {
                return target[prop];
            },
            set(target: Iterable, prop: string, newValue) {
                target[prop] = newValue;
                new noChat().eventBus.emit('flow:component-did-update');
                return true;
            },
            deleteProperty(target, prop) {
                void target;
                void prop;
                throw new Error('нет доступа');
            }
        });
    }

    checkForAuth() {
        return this.auth.hasOwnProperty('id');
    };

    set(name: string, object: unknown) {
        Object.assign( (this[name] as ProxyConstructor), object);
    }

    clearAll() {
        this._clearAllProxies();
        this._generateProxies();
    }

    get(name) {
        return this[name];
    }
}
let store = new State()
export default store;
