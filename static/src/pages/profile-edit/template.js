let pageTemplate = `
        <div class="page-center">
        {{{ components.sidebar }}}
    <main class="personal-account-wrapper">
        <div class="personal-image">
            <label class="personal-image-label">
                <input type="file" name="avatar">
                {{#profile_img}}
                    <img src="{{profile_img}}" alt="Арина">
                {{/profile_img}}
            </label>

        </div>
        <h1 class="inner-profile-name">
            {{name}}
        </h1>
        <form>
            <div class="personal-data">
                <table>
                 {{#details}}
                    <tr>
                        <td>
                            <span>
                                {{name}}
                            </span>
                        </td>
                        <td>
                            <label>
                                <input name="{{input.name}}" type="{{input.type}}" class="personal-form-control"
                                               placeholder="{{input.placeholder}}">
                                               <span class="input-error"></span>
                             </label>
                        </td>
                    </tr>
                 {{/details}}
                </table>
            </div>

            <div class="personal-data-submittion-block">
               {{{components.saveButton}}}
            </div>
        </form>
        <form>
            <div class="personal-data">
                    <table>
                        {{#passwordData}}
                        <tr>
                            <td>
                                <span>
                                    {{name}}
                                </span>
                            </td>
                            <td>
                                <label>
                                    <input name="{{input.name}}" type="{{input.type}}" class="personal-form-control"
                                                   placeholder="{{input.placeholder}}">
                                     <span class="input-error"></span>
                                 </label>
                            </td>
                        </tr>
                     {{/passwordData}}
                    </table>
                </div>
                <div class="personal-data-submittion-block">
                   {{{components.savePassButton}}}

                </div>
        </form>
    </main>
</div>
    `;
export default pageTemplate;
//# sourceMappingURL=template.js.map