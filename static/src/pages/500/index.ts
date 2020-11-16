
import Error from '../../components/httpError/Index';

interface Prop {
    code: number,
    message: string,
    link_message: string,
    href: string
}

class errorPage extends Error {
    constructor(props: Prop) {
        super((props as Prop));

    }


    renderTo(rootElement: HTMLElement) {

        rootElement.appendChild(this._render());
    }
}

export default new errorPage({
    code: 500,
    message: 'Мы уже активно фиксим',
    link_message: 'Назад к чатам',
    href: '/no-chat.html',
});

