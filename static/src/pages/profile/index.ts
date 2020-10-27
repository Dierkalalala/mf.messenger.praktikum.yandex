import '../../../vendor/templator/index';
import Sidebar from '../../components/sidebar/index';

import pageTemplate from './template';
let sidebar = new Sidebar({href: 'no-chat.html'});
import * as Mustache from '../../../typings/mustache';

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
