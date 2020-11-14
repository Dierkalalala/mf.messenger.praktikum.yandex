import '../../../vendor/templator/index.js';
import Sidebar from '../../components/sidebar/index.js';
import Button from '../../components/button/index.js';
import pageTemplate from './template.js'
import Validation from '../../../src/module/Validation.js'
import submitForm from '../../../src/module/form_handler.js';
import * as Mustache from '../../../typings/mustache';
import Block from "../../../vendor/block/index.js";
import UserApiClass from "../../api/user-api.js";
import store from "../../../vendor/state/index.js";
import isAuth from '../../module/isAuth.js'
import Router from '../../../vendor/router/index.js'

let router = new Router('.app')

interface Inputs {
    [items: string]: { [key: string ] : boolean | string | number }
}
interface Prop {
    [items: string] : unknown
}


class ProfileEditPage extends Block {
    rootElement: HTMLElement;
    profilePageElement: HTMLElement;
    savePersonalDataButton: Button;
    savePasswordButton: Button;
    sidebar: Sidebar;



    constructor(props: Prop) {
        super('div', props);
        this.rootElement = document.querySelector('.app') as HTMLElement;
        this.profilePageElement = document.createElement('div');
        this.registerEvents();
    }

    registerEvents() {
        this.eventBus.on(Block.EVENTS.INIT, this.getData.bind(this));
        this.eventBus.on(Block.EVENTS.FLOW_CDU, this.renderTo.bind(this));
    }

    getData() {
        isAuth('/profile/edit');
    }

    hide() {
        ProfileEditPage.profilePageElement.style.display = 'none';
    }

    show() {
        ProfileEditPage.profilePageElement.style.display = 'block';
    }

    _fetchData() {
        return new Promise((resolve, reject) => {
            isAuth('/profile/edit');
            UserApiClass
                .getUserById(store.auth.id)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })

    }

    render() {
        return Mustache.render(pageTemplate, this.props);
    }

    renderTo() {
        this._fetchData()
            .then(res => {
                this.savePersonalDataButton = new Button({
                    type: 'submit',
                    className: 'default-button',
                    text: 'Сохранить'
                });
                this.savePasswordButton = new Button({
                    type: 'submit',
                    className: 'default-button',
                    text: 'Изменить пароль'
                });
                this.sidebar = new Sidebar({href: '/profile'});
                this.props = Object.assign(Object.assign({}, this.props),
                    {
                        components: {
                            sidebar: this.sidebar.render(),
                            saveButton: this.savePersonalDataButton.render(),
                            savePassButton: this.savePasswordButton.render()
                        }, name: res.response.first_name, profile_img: '', details: [
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
                        ], passwordData: [
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
                        ]
                    }
                );

                try {
                    this.rootElement.removeChild(ProfileEditPage.profilePageElement);

                } catch (e) {
                    console.log('not deleted')
                }

                ProfileEditPage.profilePageElement = this._render();

                this.rootElement.appendChild(ProfileEditPage.profilePageElement);

                ProfileEditPage.profilePageElement.style.display = 'none';

                if (router._currentRoute._pathname === '/profile/edit' ) {
                    ProfileEditPage.profilePageElement.style.display = 'block';
                }

                const inputs : Inputs = {
                    login: {
                        required: true,
                    },
                    first_name: {
                        required: true,
                    },
                    second_name: {
                        required: true,
                    },
                    email: {
                        required: true,
                        email: true,
                    },
                    newPassword: {
                        required: true,
                        minLength: 6,
                    },
                    oldPassword: {
                        required: true,
                        minLength: 6
                    },
                    phone: {
                        required: true,
                        minLength: 10,
                    },
                    display_name: {
                        required: true,
                    }
                };
                Validation.validate(inputs);
                let forms = document.querySelectorAll('form');
                Array.from(forms).forEach(form => {
                    form.addEventListener('submit', (e) => {
                        let isValidData = submitForm(e);
                        if (isValidData) {
                            let object : Prop = {};
                            (isValidData as FormData).forEach(function (value, key) {
                                object[key] = value;
                            });
                            const json = JSON.stringify(object);
                            UserApiClass
                                .changeUserProfile(json)
                                .then(res => {
                                    if (res.status === 200) {
                                        store.set('auth', res.response);
                                        store.set('users', res.response);
                                        router.go('/profile');
                                    }
                                })
                                .catch(err => {
                                    alert(err);
                                })
                        }
                    });
                });
            })
            .catch(err => {
                console.log(err)
            });


    }
}

export default ProfileEditPage;



