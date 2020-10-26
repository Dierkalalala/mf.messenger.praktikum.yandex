import '../../../vendor/templator/index.js';
import ChatSidebar from '../../components/chat-sidebar/index.js';
import pageTemplate from './template.js';
let sidebar = new ChatSidebar({
    chats: [
        {
            name: 'Андрей',
            time: '10:49',
            unreadMessages: 2,
            profile_img: 'assets/img/ava-sol-b4Ml2OidO6o-unsplash.jpg',
            is_last_message_your: true,
            lastMessage: 'стикер'
        },
        {
            name: 'Андрей',
            time: '10:49',
            unreadMessages: 2,
            profile_img: 'assets/img/dibakar-roy--qkriqoGHJI-unsplash.jpg',
            is_last_message_your: false,
            lastMessage: 'Так увлёкся работой по курсу, что совсем забыл его анонсир Так увлёкся работой по курсу, что совсем забыл его анонсир'
        },
        {
            name: 'Андрей',
            time: '10:49',
            unreadMessages: 0,
            profile_img: 'assets/img/vino-li-I6rXQLWl58g-unsplash.jpg',
            is_last_message_your: true,
            lastMessage: 'Так увлёкся работой по курсу, что совсем забыл его анонсир Так увлёкся работой по курсу, что совсем забыл его анонсир'
        },
        {
            name: 'Андрей',
            time: '10:49',
            unreadMessages: 0,
            profile_img: 'assets/img/vino-li-tQyuOdG159o-unsplash.jpg',
            is_last_message_your: false,
            lastMessage: 'bla-bla'
        },
        {
            name: 'Андрей',
            time: '10:49',
            unreadMessages: 2,
            profile_img: 'assets/img/ava-sol-b4Ml2OidO6o-unsplash.jpg',
            is_last_message_your: true,
            lastMessage: 'стикер'
        },
        {
            name: 'Андрей',
            time: '10:49',
            unreadMessages: 2,
            profile_img: 'assets/img/dibakar-roy--qkriqoGHJI-unsplash.jpg',
            is_last_message_your: false,
            lastMessage: 'Так увлёкся работой по курсу, что совсем забыл его анонсир Так увлёкся работой по курсу, что совсем забыл его анонсир'
        },
        {
            name: 'Андрей',
            time: '10:49',
            unreadMessages: 0,
            profile_img: 'assets/img/vino-li-I6rXQLWl58g-unsplash.jpg',
            is_last_message_your: true,
            lastMessage: 'Так увлёкся работой по курсу, что совсем забыл его анонсир Так увлёкся работой по курсу, что совсем забыл его анонсир'
        },
        {
            name: 'Андрей',
            time: '10:49',
            unreadMessages: 0,
            profile_img: 'assets/img/vino-li-tQyuOdG159o-unsplash.jpg',
            is_last_message_your: false,
            lastMessage: 'bla-bla'
        },
    ]
});
let data = {
    components: {
        sidebar: sidebar.render(),
    }
};
// @ts-ignore
var rendered = Mustache.render(pageTemplate, data);
export default rendered;
//# sourceMappingURL=index.js.map