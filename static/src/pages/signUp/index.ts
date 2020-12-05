import Button from '../../components/button/index';
import Block from '../../vendor/block/index'
import Validation from '../../module/Validation'
import submitForm from '../../module/form_handler';
import pageTemplate from './template';
import AuthApiClass from "../../api/auth-api";
import Router from "../../vendor/router/index";
import checkForAuth from '../../module/isAuth'
const router = new Router('.app');

interface Prop {
    [items: string]: unknown
}

interface Inputs {
    [items: string]: { [key: string]: boolean | string | number }
}

class signUpPage extends Block {
    button: Button
    inputs: Inputs;
    rootElement: HTMLElement | null;

    hide() {
        if (this.rootElement !== null) {
            this.rootElement.removeChild(this._render());
        }
    }

    show() {
        if (this.rootElement !== null) {
            this.renderTo(this.rootElement)
        }
    }

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
        // @ts-ignore
        return Mustache.render(pageTemplate, this.props);
    }

    renderTo(rootElement: HTMLElement) {
        checkForAuth('/');
        this._fetchData();
        rootElement.appendChild(this._render());
        this.rootElement = rootElement;
        Validation.validate(this.inputs);
        let forms = document.querySelectorAll('.js-sign-up-form');
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', (e) => {
                let isValidData: FormData = submitForm(e, this.inputs) as FormData;
                if (isValidData) {
                    let object: Prop = {};
                    isValidData.forEach(function (value, key) {
                        object[key] = value;
                    });
                    const json = JSON.stringify(object);
                    AuthApiClass.singUp(json)
                        .then( (resp: Prop) => {
                            console.log(resp);
                            if (resp.status === 400 || resp.status === 409) {
                                this.props = {...this.props, reason: (resp.response as Prop).reason};
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
