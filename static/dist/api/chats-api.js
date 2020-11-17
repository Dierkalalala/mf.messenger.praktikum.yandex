import BaseApi from './baseApi.js';
import { ChatsApi } from './httpTransport.js';
const headers = {
    "Content-type": "application/json"
};
class chatsApiHandler extends BaseApi {
    static getAllChats() {
        return ChatsApi.get('/');
    }
    static createChat(data) {
        return ChatsApi.post('/', { data, headers: headers });
    }
    static deleteChat(data) {
        return ChatsApi.delete('', { data, headers: headers });
    }
    static addUserToChat(data) {
        return ChatsApi.put('/users', { data, headers: headers });
    }
    static getChatUsers(id) {
        return ChatsApi.get(`/${id}/users`);
    }
    static deleteChatUser(data) {
        return ChatsApi.delete('/users', { data, headers: headers });
    }
}
export default chatsApiHandler;
//# sourceMappingURL=chats-api.js.map