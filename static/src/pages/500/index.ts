import '../../../vendor/templator/index';
import Error from '../../components/httpError/Index';


let notFoundError = new Error({
    code: 500,
    message: 'Мы уже фиксим',
    link_message: 'Назад к чатам',
    href: '/no-chat.html',
});

var rendered : string = notFoundError.render();

export default rendered;
