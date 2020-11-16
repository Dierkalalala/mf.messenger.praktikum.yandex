
import Button from '../../components/button/index';
import Block from '../../../vendor/block/index'
import Validation from '../../../src/module/Validation'
import submitForm from '../../../src/module/form_handler';
import pageTemplate from './template';
import AuthApiClass from "../../api/auth-api";
import Router from "../../../vendor/router/index";
import checkForAuth from '../../../src/module/isAuth'

const router = new Router('.app');

interface Prop {
    [items: string] : unknown
}
interface Inputs {
    [items: string]: { [key: string ] : boolean | string | number }
}
class signUpPage extends Block {
    button: Button
    inputs: Inputs;

    constructor() {
        super('div');
        checkForAuth('/profile/edit');
        this.button = new Button({
            type: 'submit',
            className: 'default-button',
            text: 'Авторизоваться'
        });
        this.inputs = {
            login: {
                required: true,
            },
            password: {
                required: true,
                minLength: 6,
            }
        };
    }
    _fetchData() {
        this.props = Object.assign(Object.assign({}, this.props), { components: {
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
            ] });
    }

    render() {
        return Mustache.render(pageTemplate, this.props);
    }
    renderTo(rootElement : HTMLElement) {
        this._fetchData();
        rootElement.appendChild(this._render());
        Validation.validate(this.inputs);
        let forms = document.querySelectorAll('form');
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', (e) => {
                let isValidData : FormData = submitForm(e) as FormData;
                if (isValidData) {
                    let object : Prop = {};
                    isValidData.forEach(function (value, key) {
                        object[key] = value;
                    });
                    const json = JSON.stringify(object);
                    AuthApiClass.singUp(json)
                        .then(resp => {
                            if (resp.status === 400 || resp.status === 409) {
                                this.props = {...this.props, reason: resp.response.reason};
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
