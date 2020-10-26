import '../../../vendor/templator/index.js';
import ChatSidebar from '../../components/chat-sidebar/index.js';
import MessagesBlockClass from '../../components/messages/index.js';
import pageTemplate from './template.js';
let messages = [
    {
        is_image: false,
        is_my_message: false,
        message: ` Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в
                                        какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на
                                        Луну.
                                        Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря,
                                        все
                                        тушки этих камер все еще находятся на поверхности Луны, так как астронавты с
                                        собой
                                        забрали только кассеты с пленкой.
                                        <br><br>
                                        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на
                                        ракету
                                        они так никогда и не попали. Всего их было произведено 25 штук, одну из них
                                        недавно
                                        продали на аукционе за 45000 евро.`,
        time: '11:56',
    },
    {
        is_image: true,
        is_my_message: false,
        src: '/assets/img/test1.png',
        time: '11:56',
    },
    {
        is_image: false,
        is_my_message: true,
        message: ` Круто!!`,
        time: '11:56',
    },
];
let MessagesBlock = new MessagesBlockClass({ messages: messages });
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
    chat: {
        name: 'Вадим',
        time: '10:49',
        last_time: '5',
        unreadMessages: 2,
        profile_img: 'assets/img/ava-sol-b4Ml2OidO6o-unsplash.jpg',
        is_last_message_your: true,
        lastMessage: 'стикер'
    },
    components: {
        sidebar: sidebar.render(),
        messages: MessagesBlock.render()
    }
};
// @ts-ignore
var rendered = Mustache.render(pageTemplate, data);
export default rendered;
//# sourceMappingURL=index.js.map