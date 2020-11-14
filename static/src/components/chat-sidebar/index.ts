import Block from '../../../vendor/block/index.js'
import '../../../vendor/templator/index.js';
import template from './template.js';
import * as Mustache from '../../../typings/mustache';


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

        return Mustache.render(template, this.props);
    }
}


export default ChatSidebar
