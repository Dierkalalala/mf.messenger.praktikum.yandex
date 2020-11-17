let pageTemplate : string = `
        <div class="page-center">
        <div class="auth-form-wrapper">
            <form class="js-sign-up-form" action="" method="post">
                <div class="upper-form-block">
                    <h1 class="form-title">
                        {{pageTitile}}
                    </h1>
                    {{#inputs}}
                        <label>
                            <input name="{{name}}" type="{{type}}" class="js-input-control">
                            <span class="input-placeholder">{{placeholder}}</span>
                            <span class="input-error"></span>
                        </label>
                    {{/inputs}}
                </div>
                <div class="auth-error">{{reason}}</div>
                
                <div class="auth-form-buttons-wrapper">
                     {{{ components.button }}}
                    <div class="text-center">
                        <a href="/" class="default-link">
                            Есть аккаунт?
                        </a>
                    </div>
                </div>
            </form>
        </div>
    </div>
    `;
export default pageTemplate;
