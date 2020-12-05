import notFoundPage from '../pages/404/index';
import errorPage from '../pages/500/index';
import signIn from '../pages/signIn/index';
import signUp from '../pages/signUp/index';
import Router from '../vendor/router/index';
import noChatPage from "../pages/no-chat/index";
import ProfilePage from "../pages/profile/index";
import openChatPage from "../pages/open-chat/index";
import ProfileEditPage from "../pages/profile-edit/index";
import Modal from '../module/modal';
import '../scss/style.scss';

new Modal();

const router = new Router(".app");

router
    .use("/404", notFoundPage)
    .use("/500", errorPage)
    .use('/', signIn)
    .use('/sign-up', signUp)
    .use('/no-chat', noChatPage)
    .use('/open-chat', openChatPage)
    .use('/profile', ProfilePage)
    .use('/profile-edit', ProfileEditPage)
    .start();

document.addEventListener('click', clickToLink);

function clickToLink(e: MouseEvent) {
    let path = e.composedPath();
    path.pop();
    path.pop();
    let isAnchor = Array.from(path).find(el => {
        try {
            if ((el as HTMLElement).matches('[href]')) {
                return el;
            }
        } catch (e) {
            console.log(e)
        }
    }) as null | HTMLElement;
    if (isAnchor !== null) {
        e.preventDefault();
        let route = isAnchor.getAttribute('href');
        if (route !== null) {
            router.go(route);
        }

    }
}


