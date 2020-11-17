import Button from '../../components/button/index.js';
import Block from '../../vendor/block/index.js';
import Validation from '../../module/Validation.js';
import submitForm from '../../module/form_handler.js';
import pageTemplate from './template.js';
import AuthApiClass from "../../api/auth-api.js";
import Router from "../../vendor/router/index.js";
import checkForAuth from '../../module/isAuth.js';
const router = new Router('.app');
class signUpPage extends Block {
    constructor() {
        super('div');
        this.button = new Button({
            type: 'submit',
            className: 'default-button',
            text: 'Авторизоваться'
        });
        this.inputs = {
            first_name: {
                required: true,
            },
            second_name: {
                required: true,
            },
            login: {
                required: true
            },
            email: {
                required: true,
                email: true,
            },
            phone: {
                required: true,
            },
            password: {
                required: true,
                minLength: 6,
            }
        };
    }
    hide() {
        if (this.rootElement !== null) {
            this.rootElement.removeChild(this._render());
        }
    }
    show() {
        if (this.rootElement !== null) {
            this.renderTo(this.rootElement);
        }
    }
    _fetchData() {
        this.props = Object.assign(Object.assign({}, this.props), {
            components: {
                button: this.button.render()
            }, pageTitile: 'Регистрация',
            reason: '',
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
            ]
        });
    }
    render() {
        return Mustache.render(pageTemplate, this.props);
    }
    renderTo(rootElement) {
        checkForAuth('/');
        this._fetchData();
        rootElement.appendChild(this._render());
        this.rootElement = rootElement;
        Validation.validate(this.inputs);
        let forms = document.querySelectorAll('.js-sign-up-form');
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', (e) => {
                let isValidData = submitForm(e, this.inputs);
                if (isValidData) {
                    let object = {};
                    isValidData.forEach(function (value, key) {
                        object[key] = value;
                    });
                    const json = JSON.stringify(object);
                    AuthApiClass.singUp(json)
                        .then(resp => {
                        console.log(resp);
                        if (resp.status === 400 || resp.status === 409) {
                            this.props = Object.assign(Object.assign({}, this.props), { reason: resp.response.reason });
                            this.eventBus.emit(Block.EVENTS.FLOW_CDU);
                        }
                        if (resp.status === 200) {
                            router.go('/profile');
                        }
                    })
                        .catch(err => {
                        console.log(err);
                    });
                }
            });
        });
    }
}
export default new signUpPage();
//# sourceMappingURL=index.js.map