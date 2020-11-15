
import state from "../../../vendor/state/index";
import Sidebar from '../../components/sidebar/index';

import pageTemplate from './template';


import Block from "../../../vendor/block/index";
import Router from "../../../vendor/router/index";
import AuthApiClass from "../../../src/api/auth-api";
import checkForAuth from "../../module/isAuth";

const router = new Router('.app') as Router


interface Prop {
    [items: string] : unknown
}


function signOut() {
    AuthApiClass.logOut()
        .then(() => {
            state.clearAll();
            checkForAuth('/profile');
        })
        .catch(err => console.log(err));
}

class ProfilePage extends Block {
    rootElement: HTMLElement;
    profilePageElement: HTMLElement;
    sidebar: Sidebar

    constructor(props: Prop) {
        super('div', props);
        this.rootElement = document.querySelector('.app') as HTMLElement;
        this.profilePageElement = document.createElement('div') as HTMLElement;
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
                this.sidebar = new Sidebar({href: '/no-chat'}) as Sidebar;
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

                if ( router._currentRoute._pathname === '/profile') {
                    ProfilePage.profilePageElement.style.display = 'block';
                }

                let signOutButton = document.querySelector('-sign-out') as HTMLElement;

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


