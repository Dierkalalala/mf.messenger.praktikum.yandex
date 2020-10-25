import '../../../vendor/templator/index.js';
import Error from '../../components/httpError/index.js';

let notFoundError = new Error({
    code: 500,
    message: 'Мы уже фиксим',
    link_message: 'Назад к чатам',
    href: '/no-chat.html',
});

var rendered = notFoundError.render();

export default rendered;
