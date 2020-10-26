let pageTemplate = `
        <div class="page-wrapper">
    <div class="d-flex messenger-main-page">
        {{{components.sidebar}}}
         <main class="chats-messages-wrapper">
                <div class="chat-messages">
                    <header class="chat-messages-header">
                        <div class="chat-messages-person-info d-flex">
                            <div class="chat-messages-person-img">
                                <img src="{{chat.profile_img}}" alt="{{chat.name}}">
                            </div>
                            <div class="chat-messages-textbox">
                                <h1 class="sidebar-chat-sender">
                                    {{chat.name}}
                                </h1>
                                <div class="chat-messages-last-activity">
                                    Был {{chat.last_time}} минут назад
                                </div>
                            </div>
                        </div>
                        <a class="chat-messages-drop" href="#">
                            <svg width="3" height="16">
                                <use xlink:href="#menu_icon"></use>
                            </svg>
                            <div class="chat-messages-drop-wrapper">
                                <ul>
                                    <li>
                                        <button type="button" class="js-rename-chat chat-messages-drop-link">
                                            <svg width="22" height="19">
                                                <use xlink:href="#edit_icon"></use>
                                            </svg>
                                            <span>
                                                Переименовать
                                            </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" data-modal-id="#remove-chat" class="js-modal-trigger js-remove-chat chat-messages-drop-link">
                                            <svg width="22" height="22">
                                                <use xlink:href="#delete_icon"></use>
                                            </svg>
                                            <span>
                                                Удалить чат
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </a>
                    </header>
                    <div class="chat-messages-body">
                        <div class="chat-messages-body-wrapper">

                            {{{components.messages}}}



                        </div>
                    </div>
                    <footer class="chat-messages-footer">
                        <div class="text-submittion-wrapper">
                            <form>
                                <div class="d-flex align-items-center">
                                    <div class="clip-wrapper">
                                        <button class="clip_icon_wrapper">
                                            <svg width="32" height="32">
                                                <use xlink:href="#clip_icon"></use>
                                            </svg>
                                        </button>
                                        <div class="chat-messages-drop-wrapper">
                                            <ul>
                                                <li>
                                                    <button class="js-rename-chat chat-messages-drop-link">
                                                        <svg width="22" height="22">
                                                            <use xlink:href="#photo_icon"></use>
                                                        </svg>
                                                        <span>
                                                Фото или Видео
                                            </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="js-remove-chat chat-messages-drop-link">
                                                        <svg width="22" height="22">
                                                            <use xlink:href="#file_icon"></use>
                                                        </svg>
                                                        <span>
                                               Файл
                                            </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button class="js-remove-chat chat-messages-drop-link">
                                                        <svg width="22" height="22">
                                                            <use xlink:href="#location_icon"></use>
                                                        </svg>
                                                        <span>
                                                Локация
                                            </span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <label class="message_field-label">
                                        <textarea class="message_field" name="message" placeholder="Сообщение"></textarea>
                                    </label>
                                    <button type="submit" class="submit-message">
                                        <svg width="13" height="12">
                                            <use xlink:href="#arrow-right_icon"></use>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
        <div class="modal-overlay">
            <div id="remove-chat" class="modal-chat-delete modal">
                <div class="modal-title">
                    Вы хотите удалить чат
                </div>
                <div class="modal-buttons-row d-flex">
                    <button class="btn-danger default-button">
                        Удалить
                    </button>
                    <button data-js-modal-close class="btn-gray default-button">
                        Отменить
                    </button>
                </div>
            </div>
        </div>
</div>
    `;
export default pageTemplate;
//# sourceMappingURL=template.js.map