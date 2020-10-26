let template: string = `
    <aside class="sidebar-wrapper">
            <div class="sidebar-header">
                <div class="profile-link-wrapper">
                    <a href="#" class="profile-link">
                        Профиль
                        <svg width="6" height="10">
                            <use xlink:href="#chevron-left_icon"></use>
                        </svg>
                    </a>
                </div>
                <div class="sidebar-header-search-form">
                    <form action="">
                        <label>
                            <input type="text" class="js-input-control">
                            <span class="d-flex search-form-placeholder-wrapper align-items-center justify-content-center">
                                    <svg width="20" height="20">
                                        <use xlink:href="#search_icon"></use>
                                    </svg>
                                    <span class="search-form-placeholder">Поиск</span>
                                </span>
                        </label>
                    </form>
                </div>
            </div>
            <ul class="sidebar-content">
                {{#chats}}
                    <li class="sidebar-chat-wrap">
                    <div class="d-flex sidebar-chat">
                        <div class="sidebar-chat-img">
                            <img src="{{profile_img}}" alt="{{name}}">
                        </div>
                        <div class="sidebar-chat-textbox">
                            <h2 class="sidebar-chat-sender">
                                {{name}}
                            </h2>
                            <span class="sidebar-chat-message">
                                    <b>Вы: </b> стикер
                                </span>
                        </div>
                        <div class="sidebar-chat-additional-data">
                            <time class="sidebar-chat-time">
                                {{time}}
                            </time>
                            {{#unreadMessages}}
                                <div class="sidebar-chat-new-messages">
                                    {{unreadMessages}}
                                </div>
                            {{/unreadMessages}}    
                        </div>
                    </div>
                </li>
                 {{/chats}}
                
            </ul>
        </aside>
`
export default template
