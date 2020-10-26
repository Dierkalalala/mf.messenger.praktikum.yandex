interface Prop {
    [key: string]: unknown
}
import Block from '../../../vendor/block/index.js'
import '../../../vendor/templator/index.js';
import template from './template.js';
class Button extends Block {
    constructor(props: Prop) {
        // Создаем враппер дом-элемент button
        super("button", props);

    }

    render() {
        // В проект должен быть ваш собственный шаблонизатор
        // @ts-ignore
        return Mustache.render(template, this.props);
    }
}


export default Button
