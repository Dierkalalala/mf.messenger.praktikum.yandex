
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

    _fetchData() {
        this.props = {
            code: 500,
            message: 'Мы уже активно фиксим',
            link_message: 'Назад к чатам',
            href: '/no-chat.html',
        }
    }

    renderTo(rootElement: HTMLElement) {
        this._fetchData();

        rootElement.appendChild(this._render());
    }
}

export default errorPage;

