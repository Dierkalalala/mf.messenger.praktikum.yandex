interface Prop {
    [key: string]: unknown
}
import Block from '../../../vendor/block/index'
import '../../../vendor/templator/index';
import template from './template';
import * as Mustache from '../../../typings/mustache';


class Button extends Block {
    constructor(props: Prop) {
        // Создаем враппер дом-элемент button
        super("button", props);

    }

    render() {
        // В проект должен быть ваш собственный шаблонизатор
        return Mustache.render(template, this.props);
    }
}


export default Button
