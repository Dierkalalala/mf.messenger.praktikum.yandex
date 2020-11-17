import Block from '../../vendor/block/index.js';
import template from './template.js';
class ChatSidebar extends Block {
    constructor(props) {
        // Создаем враппер дом-элемент button
        super("div", props);
    }
    render() {
        // В проект должен быть ваш собственный шаблонизатор
        return Mustache.render(template, this.props);
    }
}
export default ChatSidebar;
//# sourceMappingURL=index.js.map