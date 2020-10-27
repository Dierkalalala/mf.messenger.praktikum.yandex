import '../../../vendor/templator/index';
import Button from '../../components/button/index';
import pageTemplate from './template';
import * as Mustache from '../../../typings/mustache';

let button = new Button({
    type: 'submit',
    className: 'default-button',
    text: 'Зарегестрироваться'
});


let data = {
    pageTitile: 'Регистрация',
    inputs: [
        {
            name: 'first_name',
            type: 'text',
            placeholder: 'Имя'
        },
        {
            name: 'second_name',
            type: 'text',
            placeholder: 'Фамилия'
        },
        {
            name: 'login',
            type: 'text',
            placeholder: 'Логин'
        },
        {
            name: 'email',
            type: 'email',
            placeholder: 'Email'
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Пароль'
        },
        {
            name: 'phone',
            type: 'tel',
            placeholder: 'Номер телефона'
        },

    ],
    components: {
        button: button.render()
    }
}


var rendered = Mustache.render(pageTemplate, data);
export default rendered
