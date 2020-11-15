// import MessagesBlockClass from '../../components/messages/index.js';
import Block from '../../../vendor/block/index.js';
import ChatSidebar from '../../components/chat-sidebar/index.js';
import pageTemplate from './template.js';
// import Sidebar from "../../components/sidebar";
import store from "../../../vendor/state/index.js";
import Router from "../../../vendor/router/index.js";
import chatsApiHandler from "../../api/chats-api.js";
// import messages from '../../components/messages/index.js'
let router = new Router('.app');
class openChatPage extends Block {
    constructor(props) {
        super('div', props);
        this.checkForActiveChat();
        this.registerEvents();
        this.openChatPageElement = document.createElement('div');
    }
    registerEvents() {
        this.eventBus.on(Block.EVENTS.FLOW_CDU, this.updateChat.bind(this));
    }
    checkForActiveChat() {
        if (store.get('activeChat').id === null || !store.get('activeChat').id) {
            router.go('/no-chat');
        }
    }
    show() {
        super.show();
    }
    _fetchData() {
        let chatsPromise = new Promise((resolve, reject) => {
            if (store.get('chats').activeChats) {
                resolve(store.chats);
            }
            else {
                chatsApiHandler.getAllChats()
                    .then(res => {
                    store.set('chats', { activeChats: res.response });
                    resolve(res.response);
                })
                    .catch(err => {
                    reject(err);
                });
            }
        });
        let chatPromise = new Promise((resolve, reject) => {
            chatsApiHandler
                .getChatUsers(store.get('activeChat').id)
                .then(res => {
                resolve(res.response);
            })
                .catch(err => reject(err));
        });
        return Promise.all([chatsPromise, chatPromise]);
    }
    render() {
        return Mustache.render(pageTemplate, this.props);
    }
    getDataForChatUpdate() {
        return new Promise((resolve, reject) => {
            chatsApiHandler
                .getChatUsers(store.get('activeChat').id)
                .then(res => {
                resolve(res.response);
            })
                .catch(err => reject(err));
        });
    }
    updateChat() {
        if (!store.get('activeChat').id) {
            return;
        }
        this.getDataForChatUpdate()
            .then(res => {
            this.sidebar = new ChatSidebar({
                chats: store.get('chats').activeChats,
            });
            // this.MessagesBlock = new messages({
            //
            // });
            this.props = Object.assign(Object.assign({}, this.props), {
                components: {
                    sidebar: this.sidebar.render(),
                },
                data: {
                    chat: {
                        name: 'Вадим',
                        time: '10:49',
                        last_time: '5',
                        unreadMessages: 2,
                        profile_img: 'assets/img/ava-sol-b4Ml2OidO6o-unsplash.jpg',
                        is_last_message_your: true,
                        lastMessage: 'стикер'
                    },
                    chatUsers: res
                }
            });
            if (openChatPage.openChatPageElement !== undefined) {
                openChatPage.openChatPageElement.innerHTML = this._render().innerHTML;
            }
        })
            .catch(err => { alert(err); });
    }
    renderTo(rootElement) {
        this._fetchData()
            .then(res => {
            this.sidebar = new ChatSidebar({
                chats: res[0],
            });
            /* this.MessagesBlock = new messages({

             });*/
            this.props = Object.assign(Object.assign({}, this.props), {
                components: {
                    sidebar: this.sidebar.render(),
                },
                data: {
                    chat: {
                        name: 'Вадим',
                        time: '10:49',
                        last_time: '5',
                        unreadMessages: 2,
                        profile_img: 'assets/img/ava-sol-b4Ml2OidO6o-unsplash.jpg',
                        is_last_message_your: true,
                        lastMessage: 'стикер'
                    },
                    chatUsers: res[1]
                }
            });
            openChatPage.openChatPageElement = this._render();
            rootElement.appendChild(openChatPage.openChatPageElement);
            let createNewChatButton = document.querySelector('-create-new-chat');
            createNewChatButton.addEventListener('submit', (e) => {
                e.preventDefault();
                let target = e.target;
                let targetInputTitle = target.title;
                let data = JSON.stringify({ title: targetInputTitle });
                chatsApiHandler.createChat(data)
                    .then(res => {
                    if (res.status === 200) {
                        chatsApiHandler.getAllChats()
                            .then(res => {
                            store.set('chats', res.response);
                            this.setProps({ chats: res.response });
                            this.registerEvents();
                        })
                            .catch(err => alert(err));
                    }
                })
                    .catch(err => alert(err));
            });
            document.addEventListener('click', (e) => {
                let path = e.composedPath();
                path.pop();
                path.pop();
                let activaChat = Array.from(path).find(el => {
                    return el.matches('[data-chat-id]');
                });
                if (activaChat !== undefined) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    store.set('activeChat', { id: activaChat.getAttribute('data-chat-id') });
                    router.go('/open-chat');
                    return false;
                }
                let deleteButton = Array.from(path).find(el => {
                    return el.matches('-delete-user');
                });
                if (deleteButton) {
                    let data = JSON.stringify({
                        users: [deleteButton.getAttribute('data-id')],
                        chatId: store.get('activeChat').id
                    });
                    chatsApiHandler
                        .deleteChatUser(data)
                        .then(res => {
                        console.log(res);
                    })
                        .catch(err => console.log(err));
                }
            });
            let addUserForm = document.querySelector('#add-user-form');
            addUserForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let userIdInput = e.target.user_id;
                let data = JSON.stringify({
                    users: [userIdInput.value],
                    chatId: store.get('activeChat').id
                });
                chatsApiHandler.addUserToChat(data)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            });
        });
    }
}
export default openChatPage;
//# sourceMappingURL=index.js.js.map
