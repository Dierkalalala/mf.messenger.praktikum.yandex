(()=>{
  'use strict'; const e=class {
    constructor() {
      this.listeners={};
    }on(e, t) {
void 0!==this.listeners[e]?this.listeners[e].push(t):this.listeners[e]=[t];
    }off(e, t) {
      this._checkEventForExisence(e), void 0!==this.listeners[e]&&(this.listeners[e]=this.listeners[e].filter(((e)=>e!==t)));
    }emit(e, ...t) {
      this._checkEventForExisence(e), this.listeners[e].forEach(((e)=>{
        e.bind(null, ...t)();
      }));
    }_checkEventForExisence(e) {
      if (null==this.listeners[e]) throw new Error(`Нет события ${e}`);
    }
  }; class t {
    constructor(n='div', s={}) {
      this.setProps=(e)=>{
        e&&Object.assign(this.props, e);
      }; const a=new e; this._meta={tagName: n, props: s}, this.props=this._makePropsProxy(s), this.eventBus=a, this._registerEvents(a), a.emit(t.EVENTS.INIT);
    }_registerEvents(e) {
      e.on(t.EVENTS.INIT, this.init.bind(this)), e.on(t.EVENTS.FLOW_CDM, this._componentDidMount.bind(this)), e.on(t.EVENTS.FLOW_RENDER, this._render.bind(this)), e.on(t.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }_createResources() {
      const {tagName: e}=this._meta; this._element=this._createDocumentElement(e);
    }init() {
      this._createResources(), this.eventBus.emit(t.EVENTS.FLOW_CDM);
    }_componentDidMount() {
      this.componentDidMount(this.props), this._render();
    }componentDidMount(e) {
      return e;
    }_componentDidUpdate(e, t) {
      this.componentDidUpdate(e, t), this._render();
    }componentDidUpdate(e, t) {
      return [e, t];
    } get element() {
      return this._element;
    }_render() {
      const e=this.render(); const t=document.createElement('div'); return this._element.innerHTML='', t.innerHTML=e, this._element.appendChild(t), this._element;
    }renderTo(e) {}render() {
      return '123';
    }getContent() {
      return this.element;
    }_makePropsProxy(e) {
      const n=this; return new Proxy(e, {get: (e, t)=>e[t], set: (e, s, a)=>(e[s]=a, n.eventBus.emit(t.EVENTS.FLOW_CDU), !0), deleteProperty(e, t) {
        throw new Error('нет доступа');
      }});
    }_createDocumentElement(e) {
      return document.createElement(e);
    }show() {
      this.element.style.display='block';
    }hide() {
      this.element.style.display='none';
    }
  }t.EVENTS={INIT: 'init', FLOW_CDM: 'flow:component-did-mount', FLOW_RENDER: 'flow:render', FLOW_CDU: 'flow:component-did-update'}; const n=t; const s=class extends n {
    constructor(e) {
      super('div', e);
    }render() {
      return Mustache.render('\n    <div class="page-center">\n        <div class="error-text-block-wrapper text-center">\n            <h1 class="error-title">\n                {{code}}\n            </h1>\n            <h3 class="error-subtitle">\n                {{message}}\n            </h3>\n\n            <a href="{{href}}" class="default-link">{{link_message}}</a>\n\n        </div>\n    </div>\n', this.props);
    }
  }; const a=new class extends s {
    constructor(e) {
      super(e);
    }renderTo(e) {
      e.appendChild(this._render());
    }
  }({code: 404, message: 'Не туда попали', link_message: 'Назад к чатам', href: '/no-chat'}); const r=new class extends s {
    constructor(e) {
      super(e);
    }renderTo(e) {
      e.appendChild(this._render());
    }
  }({code: 500, message: 'Мы уже активно фиксим', link_message: 'Назад к чатам', href: '/no-chat'}); class i {
    constructor(t='div', n={}) {
      this.setProps=(e)=>{
        e&&Object.assign(this.props, e);
      }; const s=new e; this._meta={tagName: t, props: n}, this.props=this._makePropsProxy(n), this.eventBus=s, this._registerEvents(s), s.emit(i.EVENTS.INIT);
    }_registerEvents(e) {
      e.on(i.EVENTS.INIT, this.init.bind(this)), e.on(i.EVENTS.FLOW_CDM, this._componentDidMount.bind(this)), e.on(i.EVENTS.FLOW_RENDER, this._render.bind(this)), e.on(i.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }_createResources() {
      const {tagName: e}=this._meta; this._element=this._createDocumentElement(e);
    }init() {
      this._createResources(), this.eventBus.emit(i.EVENTS.FLOW_CDM);
    }_componentDidMount() {
      this.componentDidMount(this.props), this._render();
    }componentDidMount(e) {
      return e;
    }_componentDidUpdate(e, t) {
      this.componentDidUpdate(e, t), this._render();
    }componentDidUpdate(e, t) {
      return [e, t];
    } get element() {
      return this._element;
    }_render() {
      const e=this.render(); const t=document.createElement('div'); return this._element.innerHTML='', t.innerHTML=e, this._element.appendChild(t), this._element;
    }renderTo(e) {}render() {
      return '123';
    }getContent() {
      return this.element;
    }_makePropsProxy(e) {
      const t=this; return new Proxy(e, {get: (e, t)=>e[t], set: (e, n, s)=>(e[n]=s, t.eventBus.emit(i.EVENTS.FLOW_CDU), !0), deleteProperty(e, t) {
        throw new Error('нет доступа');
      }});
    }_createDocumentElement(e) {
      return document.createElement(e);
    }show() {
      this.element.style.display='block';
    }hide() {
      this.element.style.display='none';
    }
  }i.EVENTS={INIT: 'init', FLOW_CDM: 'flow:component-did-mount', FLOW_RENDER: 'flow:render', FLOW_CDU: 'flow:component-did-update'}; const o=i; const l=class extends o {
    constructor(e) {
      super('button', e);
    }render() {
      return Mustache.render('\n    <button type="{{type}}" class="{{className}}">\n        {{text}}\n    </button>\n', this.props);
    }
  }; const d=/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; const c={inputs: {}, errorMessages: {required: 'Обязательно для заполнения', email: 'Введите корректный email', minLength: 'Минимальное количество символов {length}', isFocused: ''}, printErrorMessage: (e, t)=>{
    e.closest('label').querySelector('.input-error').textContent=t;
  }, validate: (e)=>{
    c.inputs=e; for (const t in e) {
      const n=document.getElementsByName(t)[0]; let s=[]; s=Object.entries(e[t]).reduce(((e, t)=>{
        const s=t[0]; const a=h[s].bind(n); const r=t[1]; return e.push({function: a, arguments: r}), e;
      }), []), n.addEventListener('blur', (()=>{
        for (let e=0; e<s.length; e++) if (!s[e].function(s[e].arguments)) return !1;
      })), n.addEventListener('focus', (()=>{
        c.printErrorMessage(n, c.errorMessages.isFocused);
      }));
    }
  }, validateFieldsImmediately: function(e) {
    null==e&&(e=c.inputs), console.log(e); let t=!1; for (const n in e) {
      if (!this.elements[n]) continue; const s=document.getElementsByName(n)[0]; let a=[]; a=Object.entries(e[n]).reduce(((e, t)=>{
        const n=t[0]; const a=h[n].bind(s); const r=t[1]; return e.push({function: a, arguments: r}), e;
      }), []); let r=!0; for (let e=0; e<a.length; e++)r&&(a[e].function(a[e].arguments)||(t=!0, r=!1));
    } return t;
  }}; const h={email: function() {
    return !!d.test(String(this.value).toLowerCase())||(c.printErrorMessage(this, c.errorMessages.email), !1);
  }, required: function() {
    return ''!==this.value||(c.printErrorMessage(this, c.errorMessages.required), !1);
  }, minLength: function(e) {
    return !(this.value.length<e&&(c.printErrorMessage(this, c.errorMessages.minLength.replace('{length}', String(e))), 1));
  }}; const p=c; const u=function(e, t) {
    console.log(t); const n=p.validateFieldsImmediately.bind(e.target, t)(); return console.log(n), e.preventDefault(), !n&&new FormData(e.target);
  }; const m=class {
    create() {}request() {}update() {}delete() {}
  }; const g='GET'; class v {
    constructor(e) {
      this.baseUrl='https://ya-praktikum.tech/api/v2', this.get=(e, t={})=>this.request(e, Object.assign(Object.assign({}, t), {method: g}), t.timeout), this.post=(e, t)=>this.request(e, Object.assign(Object.assign({}, t), {method: 'POST'}), t.timeout), this.put=(e, t)=>this.request(e, Object.assign(Object.assign({}, t), {method: 'PUT'}), t.timeout), this.delete=(e, t)=>this.request(e, Object.assign(Object.assign({}, t), {method: 'DELETE'}), t.timeout), this.request=(e, t, n=5e3)=>{
        let {headers: s, data: a, method: r}=t; return new Promise(((i, o)=>{
          const l=new XMLHttpRequest; r==g&&void 0!==t.data&&(e=(e+=function(e) {
            return Object.entries(e).reduce(((e, t)=>e+`${t[0]}=${t[1].toString()}&`), '?');
          }(t.data)).substr(0, e.length-1)), l.open(r, this.baseUrl+this.prefix+e), s&&Object.entries(s).forEach(((e)=>{
            const t=e[0]; const n=e[1]; l.setRequestHeader(t, n);
          })), l.withCredentials=!0, l.responseType='json', l.onload=function() {
            i(l);
          }, l.timeout=n, l.onabort=o, l.onerror=o, l.ontimeout=o, void 0!==a&&(a=a.replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&')), r!=g&&a?l.send(t.data):l.send();
        }));
      }, this.prefix=e;
    }
  } const f=new v('/auth'); const b=new v('/user'); const _=new v('/chats'); const E={'Content-type': 'application/json'}; const w=class extends m {
    static signIn(e) {
      return f.post('/signin', {data: e, headers: E});
    } static singUp(e) {
      return f.post('/signup', {data: e, headers: E});
    } static request() {
      return f.get('/user');
    } static logOut() {
      return f.post('/logout', {headers: E});
    }
  }; const y=class extends o {
    constructor(e) {
      super('aside', e);
    }render() {
      return Mustache.render('\n    <aside class="profile-sidebar sidebar-wrapper">\n        <button type="submit" class="submit-message get-back-button">\n            <a href="{{href}}">\n                <svg width="13" height="12">\n                    <use xlink:href="#arrow-right_icon"></use>\n                </svg>\n            </a>\n        </button>\n    </aside>\n    \n', this.props);
    }
  }; class C {
    constructor(e) {
      if (C.__instance) return C.__instance; this.routes=[], this.history=window.history, this._currentRoute=null, this._rootQuery=e, C.__instance=this;
    }use(e, t) {
      const n=new class {
        constructor(e, t, n) {
          if (this._pathname=e, this._block=t, this._props=n, this._isRendered=!1, this.__root=document.querySelector(this._props.rootQuery), null===this.__root) throw new Error('Кореневая директория не найдена');
        }navigate(e) {
          this.match(e)&&(this._pathname=e, this.render());
        }leave() {
          this._block&&this._block.hide();
        }match(e) {
          return e===this._pathname;
        }render() {
this._isRendered?this._block.show():null!==this.__root&&(this._block.renderTo(this.__root), this._block.show());
        }
      }(e, t, {rootQuery: this._rootQuery}); return this.routes.push(n), this;
    }start() {
      window.onpopstate=(e)=>{
        const t=e.currentTarget; if (null!==t.location) {
          const e=t.location.pathname; this._onRoute(e);
        }
      }, null!==document.location&&this._onRoute(document.location.pathname);
    }_onRoute(e) {
      const t=this.getRoute(e); if (this._currentRoute&&this._currentRoute._pathname!==e&&this._currentRoute.leave(), void 0===t) return this._currentRoute=this.routes[0], void this.go('/404'); this._currentRoute=t, t.render();
    }go(e) {
      null!==this._currentRoute&&(this.history.pushState(this._currentRoute._pathname, e, e), this._onRoute(e));
    }back() {
      this.history.back();
    }forward() {
      this.history.forward();
    }getRoute(e) {
      return this.routes.find(((t)=>t.match(e)));
    }
  } const x=C; const P=new x('.app'); function L() {
    w.logOut().then((()=>{
      H.clearAll(), P.go('/');
    })).catch(((e)=>console.log(e)));
  } class O extends o {
    constructor() {
      if (super('div'), this.rootElement=document.querySelector('.app'), null===this.rootElement) throw new Error('Корневого элемента не существует'); this.profilePageElement=document.createElement('div'), this.registerEvents();
    }registerEvents() {
      this.eventBus.on(o.EVENTS.FLOW_CDU, this.renderTo.bind(this));
    }hide() {
      try {
        O.profilePageElement.remove();
      } catch (e) {}
    }show() {
      try {
        this.renderTo();
      } catch (e) {}
    }_fetchData() {
      return new Promise(((e, t)=>{
H.auth.hasOwnProperty('id')?e(H.auth):t('error');
      }));
    }render() {
      return Mustache.render('\n        <div class="page-center">\n        {{{ components.sidebar }}}\n    <main class="personal-account-wrapper">\n        <div class="personal-image">\n            <label class="personal-image-label">\n                <input type="file" name="avatar">\n                {{#profile_img}}\n                    <img src="{{profile_img}}" alt="Арина">\n                {{/profile_img}}\n            </label>\n\n        </div>\n        <h1 class="inner-profile-name">\n            {{name}}\n        </h1>\n        <div class="personal-data">\n            <table>\n             {{#details}}\n                <tr>\n                    <td>\n                        <span>\n                            {{name}}\n                        </span>\n                    </td>\n                    <td>\n                        <p>\n                            {{value}}\n                        </p>\n                    </td>\n                </tr>\n             {{/details}}\n            </table>\n        </div>\n        <div class="personal-data personal-data-change">\n            <div class="personal-data-links">\n                <a href="/profile-edit" class="default-link">\n                    Изменить данные\n                </a>\n\n                <div class="default-link red-colored js-sign-out">\n                    Выйти\n                </div>\n            </div>\n\n        </div>\n    </main>\n</div>\n    ', this.props);
    }renderTo() {
      this._fetchData().then(((e)=>{
        this.sidebar=new y({href: '/no-chat'}), this.props=Object.assign(Object.assign({}, this.props), {components: {sidebar: this.sidebar.render()}, name: e.first_name, profile_img: e.avatar, details: [{name: 'Почта', value: e.email}, {name: 'Логин', value: e.login}]}); try {
          this.rootElement.removeChild(O.profilePageElement);
        } catch (e) {
          console.log('not deleter');
        }O.profilePageElement=this._render(), this.rootElement.appendChild(O.profilePageElement), O.profilePageElement.style.display='none', '/profile'===P._currentRoute._pathname&&(O.profilePageElement.style.display='block'); const t=document.querySelector('.js-sign-out'); null!==t&&t.addEventListener('click', L.bind(this));
      })).catch(((e)=>{
        console.log(e), P.go('/');
      }));
    }
  } const T=new O; const j=class extends o {
    constructor(e) {
      super('div', e);
    }render() {
      return Mustache.render('\n    <aside class="sidebar-wrapper">\n            <div class="sidebar-header">\n                <form class="js-create-new-chat">\n                    <input type="text" name="title">\n                    <button type="submit">Создать новый чат</button>\n                </form>\n                <div class="profile-link-wrapper">\n                    <a href="/profile" class="profile-link">\n                        Профиль\n                        <svg width="6" height="10">\n                            <use xlink:href="#chevron-left_icon"></use>\n                        </svg>\n                    </a>\n                </div>\n                <div class="sidebar-header-search-form">\n                    <form action="">\n                        <label>\n                            <input type="text" class="js-input-control">\n                            <span class="d-flex search-form-placeholder-wrapper align-items-center justify-content-center">\n                                    <svg width="20" height="20">\n                                        <use xlink:href="#search_icon"></use>\n                                    </svg>\n                                    <span class="search-form-placeholder">Поиск</span>\n                                </span>\n                        </label>\n                    </form>\n                </div>\n            </div>\n            <ul class="sidebar-content">\n                {{#chats}}\n                    <li class="sidebar-chat-wrap">\n                    <a href="/open-chat" data-chat-id="{{id}}">\n                        <div class="d-flex sidebar-chat">\n                        <div class="sidebar-chat-img">\n                            <img src="{{profile_img}}" alt="{{name}}">\n                        </div>\n                        <div class="sidebar-chat-textbox">\n                            <h2 class="sidebar-chat-sender">\n                                {{title}}\n                            </h2>\n                            <span class="sidebar-chat-message">\n                                    <b>Вы: </b> стикер\n                                </span>\n                        </div>\n                        <div class="sidebar-chat-additional-data">\n                            <time class="sidebar-chat-time">\n                                {{time}}\n                            </time>\n                            {{#unreadMessages}}\n                                <div class="sidebar-chat-new-messages">\n                                    {{unreadMessages}}\n                                </div>\n                            {{/unreadMessages}}    \n                        </div>\n                    </div>\n                    </a>\n                </li>\n                 {{/chats}}\n                \n            </ul>\n        </aside>\n', this.props);
    }
  }; const D={'Content-type': 'application/json'}; const k=class extends m {
    static getAllChats() {
      return _.get('/');
    } static createChat(e) {
      return _.post('/', {data: e, headers: D});
    } static deleteChat(e) {
      return _.delete('', {data: e, headers: D});
    } static addUserToChat(e) {
      return _.put('/users', {data: e, headers: D});
    } static getChatUsers(e) {
      return _.get(`/${e}/users`);
    } static deleteChatUser(e) {
      return _.delete('/users', {data: e, headers: D});
    }
  }; const M=new x('.app'); class S extends o {
    constructor() {
      super('div'), this.openChatPageElement=document.createElement('div');
    }updateHTMLContent() {
      S.openChatPageElement.innerHTML=this._render().outerHTML, this.addEventListeners();
    }checkForActiveChat() {
      null!==H.get('activeChat').id&&H.get('activeChat').id||M.go('/no-chat');
    }show() {
      this.checkForActiveChat(), super.show();
    }_fetchData() {
      const e=new Promise(((e, t)=>{
H.get('chats').length?e(H.chats):k.getAllChats().then(((t)=>{
  H.set('chats', t.response), e(t.response);
})).catch(((e)=>{
  t(e);
}));
      })); const t=new Promise(((e, t)=>{
        k.getChatUsers(H.get('activeChat').id).then(((t)=>{
          e(t.response);
        })).catch(((e)=>t(e)));
      })); return Promise.all([e, t]);
    }render() {
      return Mustache.render('\n        <div class="page-wrapper">\n    <div class="d-flex messenger-main-page">\n        {{{components.sidebar}}}\n         <main class="chats-messages-wrapper">\n                <div class="chat-messages">\n                    <header class="chat-messages-header">\n                        <div class="chat-messages-person-info d-flex">\n                            <div class="chat-messages-person-img">\n                                <img src="{{chat.profile_img}}" alt="{{chat.name}}">\n                            </div>\n                            <div class="chat-messages-textbox">\n                                <h1 class="sidebar-chat-sender">\n                                    {{chat.name}}\n                                </h1>\n                                <div class="chat-messages-last-activity">\n                                    Был {{chat.last_time}} минут назад\n                                </div>\n                            </div>\n                        </div>\n                        <a class="chat-messages-drop">\n                            <svg width="3" height="16">\n                                <use xlink:href="#menu_icon"></use>\n                            </svg>\n                            <div class="chat-messages-drop-wrapper">\n                                <ul>\n                                    <li>\n                                        <button type="button" class="js-rename-chat chat-messages-drop-link">\n                                            <svg width="22" height="19">\n                                                <use xlink:href="#edit_icon"></use>\n                                            </svg>\n                                            <span>\n                                                Переименовать\n                                            </span>\n                                        </button>\n                                    </li>\n                                     <li>\n                                        <button type="button" data-modal-id="#add-user" class="js-modal-trigger js-remove-chat chat-messages-drop-link">\n                                            <svg width="22" height="22">\n                                                <use xlink:href="#delete_icon"></use>\n                                            </svg>\n                                            <span>\n                                                Добавить пользователя\n                                            </span>\n                                        </button>\n                                    </li>\n                                    <li>\n                                        <button type="button" data-modal-id="#remove-chat" class="js-modal-trigger js-remove-chat chat-messages-drop-link">\n                                            <svg width="22" height="22">\n                                                <use xlink:href="#delete_icon"></use>\n                                            </svg>\n                                            <span>\n                                                Удалить чат\n                                            </span>\n                                        </button>\n                                    </li>\n                                </ul>\n                            </div>\n                        </a>\n                    </header>\n                    <div>\n                        <ul class="chat-users">\n                            {{#data.chatUsers}}\n                                <li class="sidebar-chat-wrap">\n                                        <div class="d-flex sidebar-chat">\n                                            <div class="sidebar-chat-img">\n                                                <img src="{{avatar}}" alt="{{name}}">\n                                            </div>\n                                            <div class="sidebar-chat-textbox">\n                                                <h2 class="sidebar-chat-sender">\n                                                    {{display_name}}\n                                                </h2>\n                                                <h3 >\n                                                {{role}}\n                                                </h3>\n                                            </div>\n                                        </div>\n                                        <button data-id="{{id}}" type="button" class="js-delete-user">Удалить</button>\n                                </li>\n                             {{/data.chatUsers}}\n                        </ul>\n                    </div>\n                    <div class="chat-messages-body">\n                        <div class="chat-messages-body-wrapper">\n\n                            {{{components.messages}}}\n\n\n\n                        </div>\n                    </div>\n                    <footer class="chat-messages-footer">\n                        <div class="text-submittion-wrapper">\n                            <form>\n                                <div class="d-flex align-items-center">\n                                    <div class="clip-wrapper">\n                                        <button class="clip_icon_wrapper">\n                                            <svg width="32" height="32">\n                                                <use xlink:href="#clip_icon"></use>\n                                            </svg>\n                                        </button>\n                                        <div class="chat-messages-drop-wrapper">\n                                            <ul>\n                                                <li>\n                                                    <button class="js-rename-chat chat-messages-drop-link">\n                                                        <svg width="22" height="22">\n                                                            <use xlink:href="#photo_icon"></use>\n                                                        </svg>\n                                                        <span>\n                                                Фото или Видео\n                                            </span>\n                                                    </button>\n                                                </li>\n                                                <li>\n                                                    <button class="js-remove-chat chat-messages-drop-link">\n                                                        <svg width="22" height="22">\n                                                            <use xlink:href="#file_icon"></use>\n                                                        </svg>\n                                                        <span>\n                                               Файл\n                                            </span>\n                                                    </button>\n                                                </li>\n                                                <li>\n                                                    <button class="js-remove-chat chat-messages-drop-link">\n                                                        <svg width="22" height="22">\n                                                            <use xlink:href="#location_icon"></use>\n                                                        </svg>\n                                                        <span>\n                                                Локация\n                                            </span>\n                                                    </button>\n                                                </li>\n                                            </ul>\n                                        </div>\n                                    </div>\n                                    <label class="message_field-label">\n                                        <textarea class="message_field" name="message" placeholder="Сообщение"></textarea>\n                                    </label>\n                                    <button type="submit" class="submit-message">\n                                        <svg width="13" height="12">\n                                            <use xlink:href="#arrow-right_icon"></use>\n                                        </svg>\n                                    </button>\n                                </div>\n                            </form>\n                        </div>\n                    </footer>\n                </div>\n            </main>\n        </div>\n        <div class="modal-overlay">\n            <div id="remove-chat" class="modal-chat-delete modal">\n                <div class="modal-title">\n                    Вы хотите удалить чат\n                </div>\n                <div class="modal-buttons-row d-flex">\n                    <button class="btn-danger default-button">\n                        Удалить\n                    </button>\n                    <button data-js-modal-close type="button" class="btn-gray default-button">\n                        Отменить\n                    </button>\n                </div>\n            </div>\n            <div id="add-user" class="modal-chat-delete modal">\n               <form id="add-user-form">\n                    <div class="modal-title">\n                        Вы хотите добавить пользователя?\n                    </div>\n                    <div class="add-user-input-wrapper">\n                        <input type="text" name="user_id" placeholder="Введите id пользователя">\n                    </div>\n                    <div class="modal-buttons-row d-flex">\n                        <button type="submit" class="default-button">\n                           Добавить\n                        </button>\n                        <button data-js-modal-close type="button" class="btn-gray default-button">\n                            Отменить\n                        </button>\n                    </div>\n                </form>\n            </div>\n            \n        </div>\n</div>\n    ', this.props);
    }getDataForChatUpdate() {
      return new Promise(((e, t)=>{
        k.getChatUsers(H.get('activeChat').id).then(((t)=>{
          e(t.response);
        })).catch(((e)=>t(e)));
      }));
    }updateChat() {
      H.get('activeChat').id&&this.getDataForChatUpdate().then(((e)=>{
        console.log(Array.from(H.get('chats'))), console.log(Array.from(H.get('chats'))), this.sidebar=new j({chats: H.get('chats')}), this.props=Object.assign(Object.assign({}, this.props), {components: {sidebar: this.sidebar.render()}, data: {chat: {name: 'Вадим', time: '10:49', last_time: '5', unreadMessages: 2, profile_img: 'assets/img/ava-sol-b4Ml2OidO6o-unsplash.jpg', is_last_message_your: !0, lastMessage: 'стикер'}, chatUsers: e}}), void 0!==S.openChatPageElement&&(S.openChatPageElement.innerHTML=this._render().innerHTML, this.addEventListeners());
      })).catch(((e)=>{
        console.log(e);
      }));
    }renderTo(e) {
      this.checkForActiveChat(), this._fetchData().then(((t)=>{
        this.sidebar=new j({chats: t[0]}), this.props=Object.assign(Object.assign({}, this.props), {components: {sidebar: this.sidebar.render()}, data: {chat: {name: 'Вадим', time: '10:49', last_time: '5', unreadMessages: 2, profile_img: 'assets/img/ava-sol-b4Ml2OidO6o-unsplash.jpg', is_last_message_your: !0, lastMessage: 'стикер'}, chatUsers: t[1]}}), S.openChatPageElement=this._render(), e.appendChild(S.openChatPageElement), this.addEventListeners();
      }));
    }addEventListeners() {
      document.querySelector('.js-create-new-chat').addEventListener('submit', ((e)=>{
        e.preventDefault(); const t=e.target.title; const n=JSON.stringify({title: t}); k.createChat(n).then(((e)=>{
          200===e.status&&k.getAllChats().then(((e)=>{
            H.set('chats', e.response), this.props=Object.assign(Object.assign({}, this.props), {chats: e.response}), this.updateHTMLContent();
          })).catch(((e)=>console.log(e)));
        })).catch(((e)=>console.log(e)));
      })), document.addEventListener('click', ((e)=>{
        const t=e.composedPath(); t.pop(), t.pop(); const n=Array.from(t).find(((e)=>e.matches('[data-chat-id]'))); if (void 0!==n) return e.stopImmediatePropagation(), e.stopPropagation(), H.set('activeChat', {id: n.getAttribute('data-chat-id')}), M.go('/open-chat'), !1; const s=Array.from(t).find(((e)=>e.matches('.js-delete-user'))); if (s) {
          const e=JSON.stringify({users: [s.getAttribute('data-id')], chatId: H.get('activeChat').id}); k.deleteChatUser(e).then(((e)=>{
            console.log(e);
          })).catch(((e)=>console.log(e)));
        }
      })), document.querySelector('#add-user-form').addEventListener('submit', ((e)=>{
        e.preventDefault(); const t=e.target.user_id; const n=JSON.stringify({users: [t.value], chatId: H.get('activeChat').id}); k.addUserToChat(n).then(((e)=>{
          if (200===e.status) {
            const e=document.querySelector('.modal-overlay'); null!==e&&e.classList.remove('active'), this.updateChat();
          } else alert('Упс, ошибка вышла, попробуйте ввести другой id');
        })).catch(((e)=>console.log(e)));
      }));
    }
  } const N=new S; const q=new x('.app'); class U extends o {
    constructor() {
      super('div'), this.noChatPageElement='';
    }updateHTMLContent() {
      U.noChatPageElement.innerHTML=this._render().outerHTML, this.addEventListeners();
    }_fetchData() {
      return new Promise(((e, t)=>{
H.get('chats').length?(console.log(H.get('chats')), e(H.chats)):k.getAllChats().then(((t)=>{
  H.set('chats', t.response), e(t.response);
})).catch(((e)=>{
  t(e);
}));
      }));
    }render() {
      return Mustache.render('\n        <div class="page-wrapper">\n    <div class="d-flex messenger-main-page">\n        {{{components.sidebar}}}\n        <main class="chats-messages-wrapper">\n            <div class="no-chat-message">\n                Выберите чат чтобы отправить сообщение\n            </div>\n        </main>\n    </div>\n</div>\n    ', this.props);
    }updateSideBar(e) {
      this.sidebar=new j({chats: e}), this.props=Object.assign(Object.assign({}, this.props), {components: {sidebar: this.sidebar.render()}});
    }renderTo(e) {
      this._fetchData().then(((t)=>{
        this.updateSideBar(t), U.noChatPageElement=this._render(), e.appendChild(U.noChatPageElement), this.addEventListeners();
      }));
    }addEventListeners() {
      document.querySelector('.js-create-new-chat').addEventListener('submit', ((e)=>{
        e.preventDefault(); const t=e.target; if (null==t) return; const n=t.title.value; const s=JSON.stringify({title: n}); k.createChat(s).then(((e)=>{
          200===e.status&&k.getAllChats().then(((e)=>{
            H.set('chats', e.response), this.updateSideBar(e.response), this.updateHTMLContent();
          })).catch(((e)=>console.log(e)));
        })).catch(((e)=>console.log(e)));
      })), document.addEventListener('click', ((e)=>{
        const t=e.composedPath(); t.pop(), t.pop(); const n=Array.from(t).find(((e)=>e.matches('[data-chat-id]'))); void 0!==n&&(H.set('activeChat', {id: n.getAttribute('data-chat-id')}), q.go('/open-chat'));
      }));
    }
  } const A=new U; const F={'Content-type': 'application/json'}; const B=class extends m {
    static changeUserProfile(e) {
      return b.put('/profile', {data: e, headers: F});
    } static changeUserAvatar(e) {
      return b.put('/profile/avatar', {data: e, headers: F});
    } static changeUserPassword(e) {
      return b.put('/password', {data: e, headers: F});
    } static getUserById(e) {
      return b.get(`/${e}`);
    } static searchForUsers(e) {
      return b.post('/search', {data: e, headers: F});
    }
  }; const R=new x('.app'); class I extends o {
    constructor() {
      if (super('div'), this.rootElement=document.querySelector('.app'), null===this.rootElement) throw new Error('Корневого элемента не существует'); this.profilePageElement=document.createElement('div'), this.registerEvents();
    }registerEvents() {
      this.eventBus.on(o.EVENTS.INIT, this.getData.bind(this)), this.eventBus.on(o.EVENTS.FLOW_CDU, this.renderTo.bind(this));
    }getData() {
      $('/profile-edit');
    }hide() {
      try {
        I.profilePageElement.remove();
      } catch (e) {}
    }show() {
      try {
        this.renderTo();
      } catch (e) {}
    }_fetchData() {
      return new Promise(((e, t)=>{
        $('/profile-edit'), B.getUserById(H.auth.id).then(((t)=>e(t))).catch(((e)=>t(e)));
      }));
    }render() {
      return Mustache.render('\n        <div class="page-center">\n        {{{ components.sidebar }}}\n    <main class="personal-account-wrapper">\n        <div class="personal-image">\n            <label class="personal-image-label">\n                <input type="file" name="avatar">\n                {{#profile_img}}\n                    <img src="{{profile_img}}" alt="Арина">\n                {{/profile_img}}\n            </label>\n\n        </div>\n        <h1 class="inner-profile-name">\n            {{name}}\n        </h1>\n        <form>\n            <div class="personal-data">\n                <table>\n                 {{#details}}\n                    <tr>\n                        <td>\n                            <span>\n                                {{name}}\n                            </span>\n                        </td>\n                        <td>\n                            <label>\n                                <input name="{{input.name}}" type="{{input.type}}" class="personal-form-control"\n                                               placeholder="{{input.placeholder}}">\n                                               <span class="input-error"></span>\n                             </label>\n                        </td>\n                    </tr>\n                 {{/details}}\n                </table>\n            </div>\n\n            <div class="personal-data-submittion-block">\n               {{{components.saveButton}}}\n            </div>\n        </form>\n        <form>\n            <div class="personal-data">\n                    <table>\n                        {{#passwordData}}\n                        <tr>\n                            <td>\n                                <span>\n                                    {{name}}\n                                </span>\n                            </td>\n                            <td>\n                                <label>\n                                    <input name="{{input.name}}" type="{{input.type}}" class="personal-form-control"\n                                                   placeholder="{{input.placeholder}}">\n                                     <span class="input-error"></span>\n                                 </label>\n                            </td>\n                        </tr>\n                     {{/passwordData}}\n                    </table>\n                </div>\n                <div class="personal-data-submittion-block">\n                   {{{components.savePassButton}}}\n\n                </div>\n        </form>\n    </main>\n</div>\n    ', this.props);
    }renderTo() {
      this._fetchData().then(((e)=>{
        this.savePersonalDataButton=new l({type: 'submit', className: 'default-button', text: 'Сохранить'}), this.savePasswordButton=new l({type: 'submit', className: 'default-button', text: 'Изменить пароль'}), this.sidebar=new y({href: '/profile'}), this.props=Object.assign(Object.assign({}, this.props), {components: {sidebar: this.sidebar.render(), saveButton: this.savePersonalDataButton.render(), savePassButton: this.savePasswordButton.render()}, name: e.response.first_name, profile_img: '', details: [{name: 'Имя', input: {name: 'first_name', type: 'text', placeholder: 'Имя'}}, {name: 'Фамилия', input: {name: 'second_name', type: 'text', placeholder: 'Фамилия'}}, {name: 'Имя в приложении', input: {name: 'display_name', type: 'text', placeholder: 'Имя в приложении'}}, {name: 'Почта', input: {name: 'email', type: 'email', placeholder: 'Почта'}}, {name: 'Логин', input: {name: 'login', type: 'text', placeholder: 'Логин'}}, {name: 'Номер телефона', input: {name: 'phone', type: 'tel', placeholder: 'Номер телефона'}}], passwordData: [{name: 'Новый пароль', input: {name: 'newPassword', type: 'password', placeholder: 'Введите'}}, {name: 'Старый пароль', input: {name: 'oldPassword', type: 'password', placeholder: 'Введите'}}]}); try {
          this.rootElement.removeChild(I.profilePageElement);
        } catch (e) {
          console.log('not deleted');
        }I.profilePageElement=this._render(), this.rootElement.appendChild(I.profilePageElement), I.profilePageElement.style.display='none', '/profile-edit'===R._currentRoute._pathname&&(I.profilePageElement.style.display='block'), p.validate({login: {required: !0}, first_name: {required: !0}, second_name: {required: !0}, email: {required: !0, email: !0}, newPassword: {required: !0, minLength: 6}, oldPassword: {required: !0, minLength: 6}, phone: {required: !0, minLength: 10}, display_name: {required: !0}}); const t=document.querySelectorAll('form'); Array.from(t).forEach(((e)=>{
          e.addEventListener('submit', ((e)=>{
            const t=u(e); if (t) {
              const e={}; t.forEach((function(t, n) {
                e[n]=t;
              })); const n=JSON.stringify(e); B.changeUserProfile(n).then(((e)=>{
                200===e.status&&(H.set('auth', e.response), H.set('users', e.response), R.go('/profile'));
              })).catch(((e)=>{
                console.log(e);
              }));
            }
          }));
        }));
      })).catch(((e)=>{
        console.log(e);
      }));
    }
  } const V=new I; class W {
    constructor() {
      if (W.__instance) return W.__instance; this.chats={}, this.auth={}, this.users={}, this.activeChat={}, this._generateProxies(), W.__instance=this;
    }_clearAllProxies() {
      this.chats={}, this.users={}, this.auth={}, this.activeChat={};
    }_generateProxies() {
      this.chats=new Proxy(this.chats, {get: (e, t)=>e[t], set: (e, t, n)=>(e[t]=n, N.eventBus.emit('flow:component-did-update'), A.eventBus.emit('flow:component-did-update'), !0), deleteProperty(e, t) {
        throw new Error('нет доступа');
      }}), this.auth=new Proxy(this.auth, {get: (e, t)=>e[t], set: (e, t, n)=>(e[t]=n, T.eventBus.emit('flow:component-did-update'), V.eventBus.emit('flow:component-did-update'), !0), deleteProperty(e, t) {
        throw new Error('нет доступа');
      }}), this.users=new Proxy(this.users, {get: (e, t)=>e[t], set: (e, t, n)=>(console.log('set'), e[t]=n, T.eventBus.emit('flow:component-did-update'), V.eventBus.emit('flow:component-did-update'), !0), deleteProperty(e, t) {
        throw new Error('нет доступа');
      }}), this.activeChat=new Proxy(this.activeChat, {get: (e, t)=>e[t], set: (e, t, n)=>(e[t]=n, N.eventBus.emit('flow:component-did-update'), !0), deleteProperty(e, t) {
        throw new Error('нет доступа');
      }});
    }checkForAuth() {
      return this.auth.hasOwnProperty('id');
    }set(e, t) {
      Object.assign(this[e], t);
    }clearAll() {
      this._clearAllProxies(), this._generateProxies();
    }get(e) {
      return this[e];
    }
  } const H=new W; const J=new x('.app'); const $=function(e) {
    H.get('auth').id||w.request().then((function(t) {
      200===t.status&&(H.set('auth', t.response), H.checkForAuth()?J.go(e):J.go('/'));
    })).catch(((e)=>{
      console.log(e);
    }));
  }; class Q {
    constructor(e) {
      this.inputs=Array.from(e), this.inputs.forEach(((e)=>{
        e.addEventListener('blur', Q.blur.bind(this, e));
      }));
    } static blur(e) {
      const t=e.closest('label'); if (null!==t) return ''===e.value?(t.classList.remove('js-focused'), !1):void t.classList.add('js-focused');
    }
  } const G=Q; const X=new class extends o {
    constructor() {
      super('div'), this.registerListeners(), this.button=new l({type: 'submit', className: 'default-button', text: 'Авторизоваться'}), this.inputs={login: {required: !0}, password: {required: !0, minLength: 6}};
    }hide() {
      null!==this.rootElement&&this.rootElement.removeChild(this._render());
    }show() {
      null!==this.rootElement&&this.renderTo(this.rootElement);
    }registerListeners() {
      this.eventBus.on(o.EVENTS.FLOW_CDU, this.show.bind(this));
    }_fetchData() {
      this.props=Object.assign(Object.assign({}, this.props), {code: 404, components: {button: this.button.render()}, pageTitile: 'Вход', inputs: [{name: 'login', type: 'text', placeholder: 'Почта'}, {name: 'password', type: 'password', placeholder: 'Пароль'}], reason: ''});
    }render() {
      return Mustache.render('\n        <div class="page-center">\n        <div class="auth-form-wrapper">\n            <form class="js-sign-in-form" action="" method="post">\n                <div class="upper-form-block">\n                    <h1 class="form-title">\n                        {{pageTitile}}\n                    </h1>\n                    {{#inputs}}\n                        <label>\n                            <input name="{{name}}" type="{{type}}" class="js-input-control">\n                            <span class="input-placeholder">{{placeholder}}</span>\n                            <span class="input-error"></span>\n                        </label>\n                    {{/inputs}}\n                </div>\n                <div class="auth-error">\n                {{reason}}\n                </div>\n                <div class="auth-form-buttons-wrapper">\n                     {{{ components.button }}}\n                    <div class="text-center">\n                        <a href="/sign-up" class="default-link">\n                            Нет аккаунта?\n                        </a>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n    ', this.props);
    }renderTo(e) {
      $('/profile'), this.rootElement=e, this._fetchData(), e.appendChild(this._render()), p.validate(this.inputs); const t=Array.from(document.querySelectorAll('.js-input-control')); new G(t); const n=document.querySelectorAll('.js-sign-in-form'); Array.from(n).forEach(((e)=>{
        e.addEventListener('submit', ((e)=>{
          const t=u(e); if (t) {
            const e={}; t.forEach((function(t, n) {
              e[n]=t;
            })); const n=JSON.stringify(e); w.signIn(n).then(((e)=>{
              401===e.status&&(this.props=Object.assign(Object.assign({}, this.props), {reason: e.response.reason}), this.eventBus.emit(o.EVENTS.FLOW_CDU)), 200===e.status&&$('/profile');
            })).catch(((e)=>{
              console.log(e);
            }));
          }
        }));
      }));
    }
  }; const z=new x('.app'); const K=new class extends o {
    constructor() {
      super('div'), this.button=new l({type: 'submit', className: 'default-button', text: 'Авторизоваться'}), this.inputs={first_name: {required: !0}, second_name: {required: !0}, login: {required: !0}, email: {required: !0, email: !0}, phone: {required: !0}, password: {required: !0, minLength: 6}};
    }hide() {
      null!==this.rootElement&&this.rootElement.removeChild(this._render());
    }show() {
      null!==this.rootElement&&this.renderTo(this.rootElement);
    }_fetchData() {
      this.props=Object.assign(Object.assign({}, this.props), {components: {button: this.button.render()}, pageTitile: 'Регистрация', reason: '', inputs: [{name: 'first_name', type: 'text', placeholder: 'Имя'}, {name: 'second_name', type: 'text', placeholder: 'Фамилия'}, {name: 'login', type: 'text', placeholder: 'Логин'}, {name: 'email', type: 'email', placeholder: 'Email'}, {name: 'password', type: 'password', placeholder: 'Пароль'}, {name: 'phone', type: 'tel', placeholder: 'Номер телефона'}]});
    }render() {
      return Mustache.render('\n        <div class="page-center">\n        <div class="auth-form-wrapper">\n            <form class="js-sign-up-form" action="" method="post">\n                <div class="upper-form-block">\n                    <h1 class="form-title">\n                        {{pageTitile}}\n                    </h1>\n                    {{#inputs}}\n                        <label>\n                            <input name="{{name}}" type="{{type}}" class="js-input-control">\n                            <span class="input-placeholder">{{placeholder}}</span>\n                            <span class="input-error"></span>\n                        </label>\n                    {{/inputs}}\n                </div>\n                <div class="auth-error">{{reason}}</div>\n                \n                <div class="auth-form-buttons-wrapper">\n                     {{{ components.button }}}\n                    <div class="text-center">\n                        <a href="/" class="default-link">\n                            Есть аккаунт?\n                        </a>\n                    </div>\n                </div>\n            </form>\n        </div>\n    </div>\n    ', this.props);
    }renderTo(e) {
      $('/'), this._fetchData(), e.appendChild(this._render()), this.rootElement=e, p.validate(this.inputs); const t=document.querySelectorAll('.js-sign-up-form'); Array.from(t).forEach(((e)=>{
        e.addEventListener('submit', ((e)=>{
          const t=u(e, this.inputs); if (t) {
            const e={}; t.forEach((function(t, n) {
              e[n]=t;
            })); const n=JSON.stringify(e); w.singUp(n).then(((e)=>{
              console.log(e), 400!==e.status&&409!==e.status||(this.props=Object.assign(Object.assign({}, this.props), {reason: e.response.reason}), this.eventBus.emit(o.EVENTS.FLOW_CDU)), 200===e.status&&z.go('/profile');
            })).catch(((e)=>{
              console.log(e);
            }));
          }
        }));
      }));
    }
  }; new class {
    constructor() {
      document.addEventListener('click', this.activateModal.bind(this)), document.addEventListener('click', this.closeModal.bind(this));
    }activateModal(e) {
      this.modalOverLay=document.querySelector('.modal-overlay'); const t=e.composedPath(); t.pop(), t.pop(); const n=Array.from(t).find(((e)=>e.matches('[data-modal-id]'))); if (n) {
        const e=n.getAttribute('data-modal-id'); const t=document.querySelector(e); this.modalOverLay.classList.add('active'), t.classList.add('active');
      }
    }closeModal(e) {
      this.modalOverLay=document.querySelector('.modal-overlay'); const t=e.composedPath(); t.pop(), t.pop(), Array.from(t).find(((e)=>e.matches('[data-js-modal-close]')))&&(this.modalOverLay.classList.remove('active'), Array.from(this.modalOverLay.children).forEach(((e)=>{
        e.classList.remove('active');
      })));
    }
  }; const Y=new x('.app'); Y.use('/404', a).use('/500', r).use('/', X).use('/sign-up', K).use('/no-chat', A).use('/open-chat', N).use('/profile', T).use('/profile-edit', V).start(), document.addEventListener('click', (function(e) {
    const t=e.composedPath(); t.pop(), t.pop(); const n=Array.from(t).find(((e)=>{
      try {
        if (e.matches('[href]')) return e;
      } catch (e) {
        console.log(e);
      }
    })); n&&(e.preventDefault(), Y.go(n.getAttribute('href')));
  }));
})();
