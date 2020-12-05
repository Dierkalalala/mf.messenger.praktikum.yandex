import Block from '../../vendor/block/index'
import template from './template';


interface Prop {
    [items: string] : unknown
}



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
