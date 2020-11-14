import '../../../vendor/templator/index.js';
import Error from '../../components/httpError/Index.js';
class errorPage extends Error {
    constructor(props) {
        super(props);
    }
    _fetchData() {
        this.props = {
            code: 500,
            message: 'Мы уже активно фиксим',
            link_message: 'Назад к чатам',
            href: '/no-chat.html',
        };
    }
    renderTo(rootElement) {
        this._fetchData();
        rootElement.appendChild(this._render());
    }
}
export default errorPage;
//# sourceMappingURL=index.js.map
