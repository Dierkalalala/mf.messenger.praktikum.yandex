import BaseApi from './baseApi.js';
import { ChatsApi } from './httpTransport.js';
const headers = {
    "Content-type": "application/json"
};
class chatsApiHandler extends BaseApi {
    static getAllChats() {
        return ChatsApi.get('/');
    }
    static createChat(data: string) {
        return ChatsApi.post('/', { data, headers: headers })
    }
    static deleteChat(data: string) {
        return ChatsApi.delete('', { data, headers: headers })
    }
    static addUserToChat(data: string) {
        return ChatsApi.put('/users', {data, headers: headers})
    }
    static getChatUsers(id : string) {
        return ChatsApi.get(`/${id}/users`);
    }
    static deleteChatUser(data : string) {
        return ChatsApi.delete('/users',  {data, headers: headers});
    }

}
export default chatsApiHandler;
