import '../../../vendor/templator/index.js';
import Block from '../../../vendor/block/index.js'
import ChatSidebar from '../../components/chat-sidebar/index.js';
import pageTemplate from './template.js';
import * as Mustache from '../../../typings/mustache';
import Sidebar from "../../components/sidebar/index.js";
import store from "../../../vendor/state/index.js";
import chatsApiHandler from '../../api/chats-api.js';
import Router from "../../../vendor/router/index.js";

let router = new Router('.app');

interface Prop {
    [items: string] : unknown
}

class noChatPage extends Block {
    sidebar: Sidebar;
    noChatPageElement : unknown;
    constructor(props : Prop) {
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

    renderTo(rootElement : HTMLElement) {
        this._fetchData()
            .then(res => {
                this.sidebar = new ChatSidebar({
                    chats: (res as Prop)
                });
                this.props = Object.assign(Object.assign({}, this.props),
                    {
                        components: {
                            sidebar: this.sidebar.render(),
                        }
                    });

                noChatPage.noChatPageElement = this._render();

                rootElement.appendChild(noChatPage.noChatPageElement);

                let createNewChatButton = document.querySelector('.js-create-new-chat') as HTMLElement;

                createNewChatButton.addEventListener('submit', (e: Event) => {
                    e.preventDefault();
                    let target : unknown = e.target as HTMLFormElement;
                    let targetInputTitle = (target as HTMLFormElement).title as unknown as HTMLInputElement
                    let data = JSON.stringify({title: targetInputTitle});
                    chatsApiHandler.createChat(data)
                        .then(res => {
                            if (res.status === 200) {
                                chatsApiHandler.getAllChats()
                                    .then(res => {
                                        store.set('chats', res.response);
                                        this.setProps({chats: res.response});
                                        this.registerEvents();
                                    })
                                    .catch(err => alert(err));
                            }
                        })
                        .catch(err => alert(err));
                })

                document.addEventListener('click', (e: Event) => {
                    let path =  e.composedPath();
                    path.pop()
                    path.pop()

                    let activaChat = Array.from(path).find(el => {
                        return (el as HTMLElement).matches('[data-chat-id]');
                    })
                    if(activaChat !== undefined) {
                        store.set('activeChat', {id: (activaChat as HTMLElement).getAttribute('data-chat-id') });
                        router.go('/open-chat');
                    }
                })
            });

    }
}


export default noChatPage;
