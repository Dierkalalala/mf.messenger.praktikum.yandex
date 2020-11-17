import Block from '../../vendor/block/index.js';
import ChatSidebar from '../../components/chat-sidebar/index.js';
import pageTemplate from './template.js';
import store from "../../vendor/state/index.js";
import chatsApiHandler from '../../api/chats-api.js';
import Router from "../../vendor/router/index.js";
let router = new Router('.app');
class noChatPage extends Block {
    constructor() {
        super('div');
        this.noChatPageElement = '';
    }
    updateHTMLContent() {
        noChatPage.noChatPageElement.innerHTML = this._render().outerHTML;
        this.addEventListeners();
    }
    _fetchData() {
        return new Promise((resolve, reject) => {
            if (store.get('chats').length) {
                console.log(store.get('chats'));
                resolve(store.chats);
            }
            else {
                chatsApiHandler.getAllChats()
                    .then((res) => {
                    store.set('chats', res.response);
                    resolve(res.response);
                })
                    .catch(err => {
                    reject(err);
                });
            }
        });
    }
    render() {
        return Mustache.render(pageTemplate, this.props);
    }
    updateSideBar(res) {
        this.sidebar = new ChatSidebar({
            chats: res
        });
        this.props = Object.assign(Object.assign({}, this.props), {
            components: {
                sidebar: this.sidebar.render(),
            }
        });
    }
    renderTo(rootElement) {
        this._fetchData()
            .then((res) => {
            this.updateSideBar(res);
            noChatPage.noChatPageElement = this._render();
            rootElement.appendChild(noChatPage.noChatPageElement);
            this.addEventListeners();
        });
    }
    addEventListeners() {
        let createNewChatButton = document.querySelector('.js-create-new-chat');
        createNewChatButton.addEventListener('submit', (e) => {
            e.preventDefault();
            let target = e.target;
            if (target == null) {
                return;
            }
            let targetInputTitle = target.title.value;
            let data = JSON.stringify({ title: targetInputTitle });
            chatsApiHandler.createChat(data)
                .then(res => {
                if (res.status === 200) {
                    chatsApiHandler.getAllChats()
                        .then((res) => {
                        store.set('chats', res.response);
                        this.updateSideBar(res.response);
                        this.updateHTMLContent();
                    })
                        .catch(err => console.log(err));
                }
            })
                .catch(err => console.log(err));
        });
        document.addEventListener('click', (e) => {
            let path = e.composedPath();
            path.pop();
            path.pop();
            let activaChat = Array.from(path).find(el => {
                return el.matches('[data-chat-id]');
            });
            if (activaChat !== undefined) {
                store.set('activeChat', { id: activaChat.getAttribute('data-chat-id') });
                router.go('/open-chat');
            }
        });
    }
}
export default new noChatPage();
//# sourceMappingURL=index.js.map