interface Prop {
    code: number,
    message: string,
    link_message: string,
    href: string
}
import Block from '../../../vendor/Block';
import '../../../vendor/templator/index.js';
import template from './Template';
import * as Mustache from '../../../typings/mustache';

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
