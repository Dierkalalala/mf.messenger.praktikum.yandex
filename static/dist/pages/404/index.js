import Error from '../../components/httpError/Index.js';
class notFoundError extends Error {
    constructor(props) {
        super(props);
    }
    renderTo(rootElement) {
        rootElement.appendChild(this._render());
    }
}
export default new notFoundError({ code: 404, message: 'Не туда попали', link_message: 'Назад к чатам', href: '/no-chat', });
//# sourceMappingURL=index.js.map