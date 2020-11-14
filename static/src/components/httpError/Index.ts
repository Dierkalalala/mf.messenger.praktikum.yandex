import Block from '../../../vendor/Block/index.js';
import '../../../vendor/templator/index.js';
import template from './Template.js';
import * as Mustache from '../../../typings/mustache';

interface Prop {
    code: number,
    message: string,
    link_message: string,
    href: string
}


class httpError extends Block {
    constructor(props: Prop) {
        // Создаем враппер дом-элемент button
        super("div", props);

    }

    render() {

        // В проект должен быть ваш собственный шаблонизатор

        return Mustache.render(template, this.props);
    }
}


export default httpError
