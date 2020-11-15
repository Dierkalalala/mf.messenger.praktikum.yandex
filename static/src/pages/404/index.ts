
import Error from '../../components/httpError/Index';

interface Prop {
    code: number,
    message: string,
    link_message: string,
    href: string
}

class notFoundError extends Error {
    constructor(props: Prop) {
        super((props as Prop));

    }

    _fetchData() {
        this.props = {
            code: 404,
            message: 'Не туда попали',
            link_message: 'Назад к чатам',
            href: '/no-chat.html',
        }
    }

    renderTo(rootElement: HTMLElement) {
        this._fetchData();

        rootElement.appendChild(this._render());
    }
}


export default notFoundError;

