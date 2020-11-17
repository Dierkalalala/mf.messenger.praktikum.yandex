import state from "../../../vendor/state/index";
import Sidebar from '../../components/sidebar/index';
import pageTemplate from './template';
import Block from "../../../vendor/block/index";
import Router from "../../../vendor/router/index";
import AuthApiClass from "../../../src/api/auth-api";

const router = new Router('.app');


function signOut() {
    AuthApiClass.logOut()
        .then(() => {
            state.clearAll();
            router.go('/')
        })
        .catch(err => console.log(err));
}

class ProfilePage extends Block {
    rootElement: HTMLElement | null;
    profilePageElement: HTMLElement;
    sidebar: Sidebar

    constructor() {
        super('div');
        this.rootElement = document.querySelector('.app');
        this.profilePageElement = document.createElement('div');
        this.registerEvents();
    }

    registerEvents() {
        this.eventBus.on(Block.EVENTS.FLOW_CDU, this.renderTo.bind(this));
    }

    hide() {
        ProfilePage.profilePageElement.innerHTML = '';
    }

    show() {
        ProfilePage.profilePageElement.style.display = 'block';
    }


    _fetchData() {
        return new Promise((resolve, reject) => {

            if (state.auth.hasOwnProperty('id')) {
                resolve(state.auth);
            } else {
                reject('error');
            }
        })
    }

    render() {
        return Mustache.render(pageTemplate, this.props);
    }

    renderTo(): HTMLElement | void {
        this._fetchData()
            .then(res => {
                if (this.rootElement === null && router === null) {
                    return
                }
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
                    console.log('not deleted')
                }

                ProfilePage.profilePageElement.innerHTML = this._render();

                this.rootElement.appendChild(ProfilePage.profilePageElement);

                ProfilePage.profilePageElement.style.display = 'none';

                if (router._currentRoute._pathname === '/profile' ) {
                    ProfilePage.profilePageElement.style.display = 'block';
                }

                let signOutButton = ProfilePage.profilePageElement.querySelector('.js-sign-out')
                if (signOutButton !== null) {
                    signOutButton.addEventListener('click', signOut.bind(this));
                }

            })
            .catch(err => {
                    console.log(err);
                    router.go('/')
                }
            );

    }
}

export default new ProfilePage();


