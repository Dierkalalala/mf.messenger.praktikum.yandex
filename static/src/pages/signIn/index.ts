import '../../../vendor/templator/index';
import Button from '../../components/button/index';
import pageTemplate from './template'
import * as Mustache from '../../../typings/mustache';
let button = new Button({
    type: 'submit',
    className: 'default-button',
    text: 'Авторизоваться'
});


let data = {
    pageTitile: 'Вход',
    inputs: [
        {
            name: 'login',
            type: 'text',
            placeholder: 'Почта'
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Пароль'
        },

    ],
    components: {
        button: button.render()
    }
}

var rendered = Mustache.render(pageTemplate, data);

export default rendered
