import Block from '../../../vendor/block/index.js';
import '../../../vendor/templator/index.js';
import template from './template.js';
class Button extends Block {
    constructor(props) {
        // Создаем враппер дом-элемент button
        super("button", props);
    }
    render() {
        // В проект должен быть ваш собственный шаблонизатор
        return Mustache.render(template, this.props);
    }
}
export default Button;
//# sourceMappingURL=index.js.map
