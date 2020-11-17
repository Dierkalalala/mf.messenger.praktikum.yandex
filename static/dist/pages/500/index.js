import Error from '../../components/httpError/Index.js';
class errorPage extends Error {
    constructor(props) {
        super(props);
    }
    renderTo(rootElement) {
        rootElement.appendChild(this._render());
    }
}
export default new errorPage({
    code: 500,
    message: 'Мы уже активно фиксим',
    link_message: 'Назад к чатам',
    href: '/no-chat',
});
//# sourceMappingURL=index.js.map