import '../../../vendor/templator/index.js';
import Sidebar from '../../components/sidebar/index.js';

import pageTemplate from './template.js';
let sidebar = new Sidebar({href: 'no-chat.html'});


let data = {
    name: 'Арина',
    profile_img: '',
    details: [
        {
            name: 'Почта',
            value: 'mail@inbox.com'
        },
        {
            name: 'Логин',
            value: 'username'
        }
    ],
    components: {
        sidebar: sidebar.render()
    }
}

var rendered = Mustache.render(pageTemplate, data);

export default rendered;
