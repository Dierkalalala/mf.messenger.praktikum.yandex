import ProfilePage from '../../src/pages/profile/index';
import noChat from '../../src/pages/open-chat/index';
import openChat from '../../src/pages/no-chat/index';
import ProfileEditPage from "../../src/pages/profile-edit/index";

interface IndexSignature {
    [key: string]: ProxyConstructor;
}

type Iterable = {
    [items: string] : unknown
}


class State implements IndexSignature{
    private static __instance: State;
    [key: string]: any;
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
                noChat.eventBus.emit('flow:component-did-update');
                openChat.eventBus.emit('flow:component-did-update');
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
                ProfilePage.eventBus.emit('flow:component-did-update');
                ProfileEditPage.eventBus.emit('flow:component-did-update');
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
                ProfilePage.eventBus.emit('flow:component-did-update');
                ProfileEditPage.eventBus.emit('flow:component-did-update');
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
                noChat.eventBus.emit('flow:component-did-update');
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
        Object.assign( this[name], object);
    }

    clearAll() {
        this._clearAllProxies();
        this._generateProxies();
    }

    get(name : string) {
        return this[name];
    }
}
let store = new State();
export default store;
