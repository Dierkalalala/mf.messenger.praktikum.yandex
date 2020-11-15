
import Block from '../../../vendor/block/index'
import template from './template';
interface Prop {
    items?: { [key: string]: unknown }
}


class Input extends Block {
    constructor(props: Prop) {
        // Создаем враппер дом-элемент button
        super("input", props);

    }

    render() {
        // В проект должен быть ваш собственный шаблонизатор

        return Mustache.render(template, this.props);
    }
}


export default Input
