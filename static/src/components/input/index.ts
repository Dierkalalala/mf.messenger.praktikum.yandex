interface Prop {
    items?: { [key: string]: unknown }
}
import Block from '../../../vendor/block/index.js'
import '../../../vendor/templator/index.js';
import template from './template.js';
class Input extends Block {
    constructor(props: Prop) {
        // Создаем враппер дом-элемент button
        super("input", props);

    }

    render() {
        // В проект должен быть ваш собственный шаблонизатор
        // @ts-ignore
        return Mustache.render(template, this.props);
    }
}


export default Input
