import Button from '../../components/button/index.js';
import pageTemplate from './template.js';
import Block from '../../vendor/block/index.js';
import Validation from '../../module/Validation.js';
import submitForm from '../../module/form_handler.js';
import AuthApiClass from '../../api/auth-api.js';
import isAuth from '../../module/isAuth.js';
import Placeholder from '../../module/placeholder.js';
class signInPage extends Block {
    constructor() {
        super('div');
        this.registerListeners();
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
    registerListeners() {
        this.eventBus.on(Block.EVENTS.FLOW_CDU, this.show.bind(this));
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
    renderTo(rootElement) {
        isAuth('/profile');
        this.rootElement = rootElement;
        this._fetchData();
        rootElement.appendChild(this._render());
        Validation.validate(this.inputs);
        let inputControls = Array.from(document.querySelectorAll('.js-input-control'));
        new Placeholder(inputControls);
        let forms = document.querySelectorAll('.js-sign-in-form');
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', (e) => {
                let isValidData = submitForm(e);
                if (isValidData) {
                    let object = {};
                    isValidData.forEach(function (value, key) {
                        object[key] = value;
                    });
                    const json = JSON.stringify(object);
                    AuthApiClass.signIn(json)
                        .then(resp => {
                        if (resp.status === 401) {
                            this.props = Object.assign(Object.assign({}, this.props), { reason: resp.response.reason });
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
export default new signInPage();
//# sourceMappingURL=index.js.map