import Block from '../../../vendor/block/index';
import '../../../vendor/templator/index';
import template from './template';
import * as Mustache from '../../../typings/mustache';
class Input extends Block {
    constructor(props) {
        // Создаем враппер дом-элемент button
        super("input", props);
    }
    render() {
        // В проект должен быть ваш собственный шаблонизатор
        return Mustache.render(template, this.props);
    }
}
export default Input;
//# sourceMappingURL=index.js.map