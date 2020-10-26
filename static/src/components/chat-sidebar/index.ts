interface Prop {
    chats: Array<{
        name: string,
        time: string,
        unreadMessages: number,
        profile_img: string,
        is_last_message_your: boolean,
        lastMessage: string
    }>
}
import Block from '../../../vendor/block/index.js'
import '../../../vendor/templator/index.js';
import template from './template.js';
class ChatSidebar extends Block {
    constructor(props: Prop) {
        // Создаем враппер дом-элемент button
        super("div", props);

    }

    render() {
        // В проект должен быть ваш собственный шаблонизатор
        // @ts-ignore
        return Mustache.render(template, this.props);
    }
}


export default ChatSidebar
