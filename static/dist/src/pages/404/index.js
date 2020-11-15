import Error from '../../components/httpError/Index.js';
class notFoundError extends Error {
    constructor(props) {
        super(props);
    }
    _fetchData() {
        this.props = {
            code: 404,
            message: 'Не туда попали',
            link_message: 'Назад к чатам',
            href: '/no-chat.html',
        };
    }
    renderTo(rootElement) {
        this._fetchData();
        rootElement.appendChild(this._render());
    }
}
export default notFoundError;
//# sourceMappingURL=index.js.map
