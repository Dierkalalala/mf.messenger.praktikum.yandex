import '../../../vendor/templator/index.js';
import Button from '../../components/button/index.js';
import pageTemplate from './template.js';
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
};
// @ts-ignore
var rendered = Mustache.render(pageTemplate, data);
export default rendered;
//# sourceMappingURL=index.js.map