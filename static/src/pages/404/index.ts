import '../../../vendor/templator/index';
import Error from '../../components/httpError/Index';

let notFoundError = new Error({
    code: 404,
    message: 'Не туда попали',
    link_message: 'Назад к чатам',
    href: '/no-chat.html',
});

var rendered : string = notFoundError.render();

export default rendered;

