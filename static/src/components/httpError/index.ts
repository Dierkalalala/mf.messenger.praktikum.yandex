interface Prop {
    code: number,
    message: string,
    link_message: string,
    href: string
}
import Block from '../../../vendor/block/index.js';
import '../../../vendor/templator/index.js';
import template from './template.js';
class httpError extends Block {
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


export default httpError
