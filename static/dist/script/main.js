import notFoundPage from '../pages/404/index.js';
import errorPage from '../pages/500/index.js';
import signIn from '../pages/signIn/index.js';
import signUp from '../pages/signUp/index.js';
import Router from '../vendor/router/index.js';
import noChatPage from "../pages/no-chat/index.js";
import ProfilePage from "../pages/profile/index.js";
import openChatPage from "../pages/open-chat/index.js";
import ProfileEditPage from "../pages/profile-edit/index.js";
import Modal from '../module/modal.js';
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
function clickToLink(e) {
    let path = e.composedPath();
    path.pop();
    path.pop();
    let isAnchor = Array.from(path).find(el => {
        try {
            if (el.matches('[href]')) {
                return el;
            }
        }
        catch (e) {
            console.log(e);
        }
    });
    if (isAnchor) {
        e.preventDefault();
        router.go(isAnchor.getAttribute('href'));
    }
}
//# sourceMappingURL=main.js.map