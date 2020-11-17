import Block from '../../vendor/block/index'
import template from './template';
interface Prop {
    [key: string]: unknown
}



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
