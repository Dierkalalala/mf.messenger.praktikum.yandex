import '../../../vendor/templator/index.js';
import Sidebar from '../../components/sidebar/index.js';
import Button from '../../components/button/index.js';
import pageTemplate from './template.js'


let sidebar = new Sidebar({href: '/profile.html'});
let savePersonalDataButton = new Button({
    type: 'submit',
    className: 'default-button',
    text: 'Сохранить'
})

let savePasswordButton = new Button({
    type: 'submit',
    className: 'default-button',
    text: 'Изменить пароль'
})


let data = {
    name: 'Арина',
    profile_img: '',
    details: [
        {
            name: 'Имя',
            input: {
                name: 'first_name',
                type: 'text',
                placeholder: 'Имя',
            }
        },
        {
            name: 'Фамилия',
            input: {
                name: 'second_name',
                type: 'text',
                placeholder: 'Фамилия',
            }
        },
        {
            name: 'Имя в приложении',
            input: {
                name: 'display_name',
                type: 'text',
                placeholder: 'Имя в приложении',
            }
        },
        {
            name: 'Почта',
            input: {
                name: 'email',
                type: 'email',
                placeholder: 'Почта',
            }
        },
        {
            name: 'Логин',
            input: {
                name: 'login',
                type: 'text',
                placeholder: 'Логин',
            }
        },
        {
            name: 'Номер телефона',
            input: {
                name: 'phone',
                type: 'tel',
                placeholder: 'Номер телефона',
            }
        },
    ],
    passwordData: [
        {
            name: 'Новый пароль',
            input: {
                name: 'newPassword',
                type: 'password',
                placeholder: 'Введите',
            }
        },
        {
            name: 'Старый пароль',
            input: {
                name: 'oldPassword',
                type: 'password',
                placeholder: 'Введите',
            }
        },
    ],
    components: {
        sidebar: sidebar.render(),
        saveButton: savePersonalDataButton.render(),
        savePassButton: savePasswordButton.render()
    }
}

// @ts-ignore
var rendered = Mustache.render(pageTemplate, data);

export default rendered
