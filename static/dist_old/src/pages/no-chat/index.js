import '../../../vendor/templator/index.js';
import Block from '../../../vendor/block/index.js';
import ChatSidebar from '../../components/chat-sidebar/index.js';
import pageTemplate from './template.js';
import store from "../../../vendor/state/index.js";
import chatsApiHandler from '../../api/chats-api.js';
import Router from "../../../vendor/router/index.js";

let router = new Router('.app');

class noChatPage extends Block {
    constructor(props) {
        super('div', props);
        this.noChatPageElement = '';
    }

    registerEvents() {
        noChatPage.noChatPageElement.innerHTML = this._render().outerHTML;
    }
    _fetchData() {

        return new Promise((resolve, reject) => {
            if (store.get('chats').activeChats) {
                resolve(store.chats);
            } else {
                chatsApiHandler.getAllChats()
                    .then(res => {
                        store.set('chats', {activeChats: res.response});
                        resolve(res.response)
                    })
                    .catch(err => {
                        reject(err);
                    })
            }

        })

    }

    render() {
        return Mustache.render(pageTemplate, this.props);
    }

    renderTo(rootElement) {
        this._fetchData()
            .then(res => {
                this.sidebar = new ChatSidebar({
                    chats: res
                });
                this.props = Object.assign(Object.assign({}, this.props),
                    {
                        components: {
                            sidebar: this.sidebar.render(),
                        }
                    });

                noChatPage.noChatPageElement = this._render();

                rootElement.appendChild(noChatPage.noChatPageElement);

                let createNewChatButton = document.querySelector('.js-create-new-chat');

                createNewChatButton.addEventListener('submit', (e) => {
                    e.preventDefault();
                    let data = JSON.stringify({title: e.target.title.value});
                    chatsApiHandler.createChat(data)
                        .then(res => {
                            if (res.status === 200) {
                                chatsApiHandler.getAllChats()
                                    .then(res => {
                                        store.set('chats', res.response);
                                        this.setProps({chats: res.response});
                                        this.registerEvents(rootElement);
                                    })
                                    .catch(err => alert(err));
                            }
                        })
                        .catch(err => alert(err));
                })

                document.addEventListener('click', (e) => {
                    let path = e.path || e.composedPath();
                    path.pop()
                    path.pop()

                    let activaChat = Array.from(path).find(el => {
                        return el.matches('[data-chat-id]');
                    })
                    if(activaChat !== undefined) {
                        store.set('activeChat', {id: activaChat.getAttribute('data-chat-id') });
                        router.go('/open-chat');
                    }
                })
            });

    }
}

export default noChatPage;
