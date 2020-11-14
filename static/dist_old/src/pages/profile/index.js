import '../../../vendor/templator/index.js';
import state from "../../../vendor/state/index.js";
import Sidebar from '../../components/sidebar/index.js';
import pageTemplate from './template.js';
import Block from "../../../vendor/block/index.js";
import Router from "../../../vendor/router/index.js";
import AuthApiClass from "../../../src/api/auth-api.js";
import checkForAuth from "../../module/isAuth.js";


const router = new Router('.app')

function signOut() {
    AuthApiClass.logOut()
        .then(res => {
            state.clearAll();
            checkForAuth();
        })
        .catch(err => console.log(err));
}

class ProfilePage extends Block {
    constructor(props) {
        super('div', props);
        this.rootElement = document.querySelector('.app');
        this.profilePageElement = document.createElement('div');
        this.registerEvents();
    }

    registerEvents() {
        this.eventBus.on(Block.EVENTS.FLOW_CDU, this.renderTo.bind(this));
    }

    hide() {
        try {
            ProfilePage.profilePageElement.style.display = 'none';
        } catch (e) {
            void e
        }
    }

    show() {
        try {
            ProfilePage.profilePageElement.style.display = 'block';
        } catch (e) {
            void e
        }
    }

    _fetchData() {
        return new Promise((resolve, reject) => {

            if (state.auth.hasOwnProperty('id')) {
                resolve(state.auth)
            } else {
                reject('error');
            }
        })
    }

    render() {
        return Mustache.render(pageTemplate, this.props);
    }

    renderTo() {
        this._fetchData()
            .then(res => {
                this.sidebar = new Sidebar({href: '/no-chat'});
                this.props = Object.assign(Object.assign({}, this.props),
                    {
                        components: {
                            sidebar: this.sidebar.render(),
                        },
                        name: res.first_name,
                        profile_img: res.avatar,
                        details: [
                            {
                                name: 'Почта',
                                value: res.email
                            },
                            {
                                name: 'Логин',
                                value: res.login
                            }
                        ]
                    });
                try {

                    this.rootElement.removeChild(ProfilePage.profilePageElement);

                } catch (e) {
                    console.log('not deleter')
                }

                ProfilePage.profilePageElement = this._render();


                this.rootElement.appendChild(ProfilePage.profilePageElement);


                ProfilePage.profilePageElement.style.display = 'none';

                if (router._currentRoute._pathname === '/profile') {
                    ProfilePage.profilePageElement.style.display = 'block';
                }

                let signOutButton = document.querySelector('.js-sign-out');

                signOutButton.addEventListener('click', signOut.bind(this));

            })
            .catch(err => {
                    console.log(err);
                    router.go('/')
                }
            );

    }
}

export default ProfilePage;
