import Block from '../../vendor/block/index'
import ChatSidebar from '../../components/chat-sidebar/index';
import pageTemplate from './template';
import Sidebar from "../../components/sidebar/index";
import store from "../../vendor/state/index";
import chatsApiHandler from '../../api/chats-api';
import Router from "../../vendor/router/index";

let router = new Router('.app');

interface Prop {
    [items: string] : unknown
}

class noChatPage extends Block {
    sidebar: Sidebar;
    noChatPageElement : unknown;
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
            } else {
                chatsApiHandler.getAllChats()
                    .then((res) => {
                        store.set('chats',res.response);
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

    updateSideBar(res : Prop) {
        this.sidebar = new ChatSidebar({
            chats: res
        });
        this.props = Object.assign(Object.assign({}, this.props),
            {
                components: {
                    sidebar: this.sidebar.render(),
                }
            });
    }

    renderTo(rootElement : HTMLElement) {
        this._fetchData()
            .then((res: Prop) => {
                this.updateSideBar(res);
                noChatPage.noChatPageElement = this._render();

                rootElement.appendChild(noChatPage.noChatPageElement);

                this.addEventListeners();

            });

    }

    addEventListeners() {
        let createNewChatButton = document.querySelector('.js-create-new-chat') as HTMLElement;

        createNewChatButton.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            let target: HTMLFormElement = e.target;
            if (target == null) {
                return;
            }
            let targetInputTitle = target.title.value;
            let data = JSON.stringify({title: targetInputTitle});
            chatsApiHandler.createChat(data)
                .then(res => {
                    if (res.status === 200) {
                        chatsApiHandler.getAllChats()
                            .then((res : Prop) => {
                                store.set('chats', res.response);
                                this.updateSideBar(res.response);
                                this.updateHTMLContent();
                            })
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
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
    }
}


export default new noChatPage();
