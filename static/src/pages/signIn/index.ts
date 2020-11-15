
import Button from '../../components/button/index';
import pageTemplate from './template'
import Block from '../../../vendor/block/index'
import Validation from '../../../src/module/Validation'
import submitForm from '../../../src/module/form_handler';
import AuthApiClass from '../../api/auth-api';
import isAuth from '../../../src/module/isAuth'
// import Router from "../../../vendor/router/index";
// let router = new Router('.app')

interface Prop {
    [items: string]: unknown
}

interface Inputs {
    [items: string]: { [key: string]: boolean | string | number }
}

class signInPage extends Block {
    button: Button;
    inputs: Inputs;
    rootElement: HTMLElement;

    constructor(props : Prop) {
        super('div', props);
        isAuth('/profile');

        this.button = new Button({
            type: 'submit',
            className: 'default-button',
            text: 'Авторизоваться',
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
        this.props = Object.assign(Object.assign({}, this.props), {
            code: 404, components: {
                button: this.button.render()
            }, pageTitile: 'Вход', inputs: [
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
            reason: '',
        });
    }

    render() {
        return Mustache.render(pageTemplate, this.props);
    }

    renderTo(rootElement = this.rootElement) {
        this.rootElement = rootElement;
        this._fetchData();
        rootElement.appendChild(this._render());
        Validation.validate(this.inputs);
        let forms = document.querySelectorAll('form');
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', (e) => {
                let isValidData: FormData = submitForm(e) as FormData;
                if (isValidData) {
                    let object : Prop = {};
                    isValidData.forEach(function (value, key) {
                        object[key] = value;
                    });
                    const json = JSON.stringify(object);
                    AuthApiClass.signIn(json)
                        .then(resp => {
                            if (resp.status === 401) {
                                this.props = {...this.props, reason: resp.response.reason};
                                this.eventBus.emit(Block.EVENTS.FLOW_CDU);
                            }
                            if (resp.status === 200) {
                                isAuth('/profile');
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


export default signInPage;
