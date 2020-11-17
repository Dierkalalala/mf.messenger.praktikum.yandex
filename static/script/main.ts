import notFoundPage from '../src/pages/404/index';
import errorPage from '../src/pages/500/index';
import signIn from '../src/pages/signIn/index';
import signUp from '../src/pages/signUp/index';
import Router from '../vendor/router/index';
import noChatPage from "../src/pages/no-chat/index";
import ProfilePage from "../src/pages/profile/index";
import openChatPage from "../src/pages/open-chat/index";
import ProfileEditPage from "../src/pages/profile-edit/index";
import Modal from '../src/module/modal'

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
    console.log(e);
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
    });
    if (isAnchor) {
        e.preventDefault();
        router.go(isAnchor.getAttribute('href'));
    }
}


