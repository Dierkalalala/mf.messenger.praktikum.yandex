import '../../../vendor/templator/index.js';
import Error from '../../components/httpError/Index.js';
class notFoundError extends Error {
    constructor(props) {
        super(props);
    }
    _fetchData() {
        this.props = {
            code: 404,
            message: 'Не туда попали',
            link_message: 'Мой профиль',
            href: '/profile',
        };
    }
    renderTo(rootElement) {
        this._fetchData();
        rootElement.appendChild(this._render());
    }
}
export default notFoundError;
//# sourceMappingURL=index.js.map
