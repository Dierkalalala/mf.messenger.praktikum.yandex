import notFoundPage from '../src/pages/404/index.js';
import errorPage from '../src/pages/500/index.js';
import signIn from '../src/pages/signIn/index.js';
import signUp from '../src/pages/signUp/index.js';
import Router from '../vendor/router/index.js';
import noChatPage from "../src/pages/no-chat/index.js";
import ProfilePage from "../src/pages/profile/index.js";
import openChatPage from "../src/pages/open-chat/index.js";
import ProfileEditPage from "../src/pages/profile-edit/index.js";
import Modal from '../src/module/modal.js'

let modals = new Modal();

const router = new Router(".app");

router
// @ts-ignore
    .use("/404", notFoundPage)
    // @ts-ignore
    .use("/500", errorPage)
    // @ts-ignore
    .use('/', signIn)
    // @ts-ignore
    .use('/sign-up', signUp)
    // @ts-ignore
    .use('/no-chat', noChatPage)
    // @ts-ignore
    .use('/open-chat', openChatPage)
    // @ts-ignore
    .use('/profile', ProfilePage)
    // @ts-ignore
    .use('/profile/edit', ProfileEditPage)
    .start();

document.addEventListener('click', clickToLink);

function clickToLink(e : MouseEvent) {
    let path = e.composedPath();
    path.pop();
    path.pop();
    let isAnchor = Array.from(path).find( el  => {
        try {
            if ( (el as HTMLElement).matches('[href]')) {
                return el;
            }
        } catch (e) {
            alert(e)
        }
    });
    if (isAnchor) {
        e.preventDefault();
        setTimeout(() => {
            router.go(isAnchor.getAttribute('href'));
        }, 200)

    }
}


