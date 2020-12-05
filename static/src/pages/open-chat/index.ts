import Block from '../../vendor/block/index'
import ChatSidebar from '../../components/chat-sidebar/index';
import pageTemplate from './template';
import store from "../../vendor/state/index";
import Router from "../../vendor/router/index";
import chatsApiHandler from "../../api/chats-api";

let router = new Router('.app');

interface Prop {
    [items: string]: unknown
}

class openChatPage extends Block {
    sidebar: ChatSidebar
    private static openChatPageElement: HTMLElement;

    constructor() {
        super('div');

    }

    updateHTMLContent() {
        openChatPage.openChatPageElement.innerHTML = this._render().outerHTML;

        this.addEventListeners();
    }

    checkForActiveChat() {
        if (store.get('activeChat').id === null || !store.get('activeChat').id) {
            router.go('/no-chat')
        }
    }

    show() {
        this.checkForActiveChat();
        super.show();

    }

    _fetchData() {
        let chatsPromise = new Promise((resolve, reject) => {
            if (store.get('chats').length) {
                resolve(store.chats);
            } else {
                chatsApiHandler.getAllChats()
                    .then( (res: Prop) => {
                        store.set('chats', res.response);
                        resolve(res.response);
                    })
                    .catch(err => {
                        reject(err);
                    })
            }
        });
        let chatPromise = new Promise((resolve, reject) => {

            chatsApiHandler
                .getChatUsers(store.get('activeChat').id)
                .then((res: Prop) => {
                    resolve(res.response)
                })
                .catch(err => reject(err))
        })
        return Promise.all([chatsPromise, chatPromise])

    }

    render() {
        // @ts-ignore
        return Mustache.render(pageTemplate, this.props);
    }

    getDataForChatUpdate() {
        return new Promise((resolve, reject) => {

            chatsApiHandler
                .getChatUsers(store.get('activeChat').id)
                .then((res : Prop) => {
                    resolve(res.response)
                })
                .catch(err => reject(err))
        })
    }

    updateChat() {
        if (!store.get('activeChat').id) {
            return;
        }
        this.getDataForChatUpdate()
            .then(res => {
                console.log(Array.from(store.get('chats')));
                console.log(Array.from(store.get('chats')));
                this.sidebar = new ChatSidebar({
                    chats: store.get('chats'),
                });
                // this.MessagesBlock = new messages({
                //
                // });

                this.props = Object.assign(Object.assign({}, this.props),
                    {
                        components: {
                            sidebar: this.sidebar.render(),
                            /*messages: this.MessagesBlock.render()*/
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
                    this.addEventListeners();
                }

            })
            .catch(err => {
                console.log(err)
            });


    }

    renderTo(rootElement: HTMLElement) {
        this.checkForActiveChat();
        this._fetchData()
            .then(res => {
                this.sidebar = new ChatSidebar({
                    chats: res[0] as Prop,
                });
                /* this.MessagesBlock = new messages({

                 });*/

                this.props = Object.assign(Object.assign({}, this.props),
                    {
                        components: {
                            sidebar: this.sidebar.render(),
                            /*messages: this.MessagesBlock.render()*/
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

                this.addEventListeners();

            });
    }

    addEventListeners() {
        let createNewChatButton = document.querySelector('.js-create-new-chat') as HTMLElement;

        createNewChatButton.addEventListener('submit', (e) => {
            e.preventDefault();
            let target: unknown = e.target as HTMLFormElement;
            let targetInputTitle = (target as HTMLFormElement).title as unknown as HTMLInputElement
            let data = JSON.stringify({title: targetInputTitle});
            chatsApiHandler.createChat(data)
                .then((res : Prop) => {
                    if (res.status === 200) {
                        chatsApiHandler.getAllChats()
                            .then((res: Prop) => {
                                store.set('chats', res.response);
                                this.props = {
                                    ...this.props,
                                    chats: res.response
                                }
                                this.updateHTMLContent();
                            })
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
        })

        document.addEventListener('click', (e) => {
            let path = e.composedPath();
            path.pop()
            path.pop()

            let activaChat = Array.from(path).find(el => {
                return (el as HTMLElement).matches('[data-chat-id]');
            });
            if (activaChat !== undefined) {
                e.stopImmediatePropagation();
                e.stopPropagation();
                store.set('activeChat', {id: (activaChat as HTMLElement).getAttribute('data-chat-id')});
                router.go('/open-chat');
                return false;
            }

            let deleteButton = Array.from(path).find(el => {
                return (el as HTMLElement).matches('.js-delete-user')
            })

            if (deleteButton) {
                let data = JSON.stringify({
                    users: [(deleteButton as HTMLElement).getAttribute('data-id')],
                    chatId: store.get('activeChat').id
                })
                chatsApiHandler
                    .deleteChatUser(data)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => console.log(err));
            }
        })

        let addUserForm = document.querySelector('#add-user-form') as HTMLFormElement;

        addUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let userIdInput = (e.target as HTMLFormElement).user_id as HTMLInputElement
            let data = JSON.stringify({
                users: [userIdInput.value],
                chatId: store.get('activeChat').id
            });
            chatsApiHandler.addUserToChat(data)
                .then((res: Prop) => {
                    if (res.status === 200) {
                        let modalOverlay = document.querySelector('.modal-overlay');
                        if (modalOverlay !== null) {
                            modalOverlay.classList.remove('active');
                        }
                        this.updateChat();
                    } else {
                        alert('Упс, ошибка вышла, попробуйте ввести другой id');
                    }
                })
                .catch(err => console.log(err))

        })
    }
}

export default new openChatPage();

