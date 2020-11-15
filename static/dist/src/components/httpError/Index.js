import Block from '../../../vendor/Block/index.js';
import template from './Template.js';
class httpError extends Block {
    constructor(props) {
        // Создаем враппер дом-элемент button
        super("div", props);
    }
    render() {
        // В проект должен быть ваш собственный шаблонизатор
        return Mustache.render(template, this.props);
    }
}
export default httpError;
//# sourceMappingURL=Index.js.map
