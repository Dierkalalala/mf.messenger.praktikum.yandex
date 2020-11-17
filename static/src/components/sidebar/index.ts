import Block from '../../vendor/block/index'
import template from './template';

interface Prop {
    [key: string] : unknown
}


// Импортировал js так как не мог нормально собрать проект, чтобы он сразу выдавал
// мне валидный код с правильным расширением и ts пока не может
// https://github.com/Microsoft/TypeScript/issues/13422 Очень жду спринта с вебпаком =)

class Sidebar extends Block {
    constructor(props: Prop) {
        // Создаем враппер дом-элемент button
        super("aside", props);

    }

    render() {
        // В проект должен быть ваш собственный шаблонизатор

        return Mustache.render(template, this.props);
    }
}


export default Sidebar
