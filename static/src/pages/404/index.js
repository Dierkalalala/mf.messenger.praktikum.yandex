import '../../../vendor/templator/index.js';
import Error from '../../components/httpError/index.js';
let notFoundError = new Error({
    code: 404,
    message: 'Не туда попали',
    link_message: 'Назад к чатам',
    href: '/no-chat.html',
});
var rendered = notFoundError.render();
export default rendered;
//# sourceMappingURL=index.js.map