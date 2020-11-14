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
                        <p>
                            {{value}}
                        </p>
                    </td>
                </tr>
             {{/details}}
            </table>
        </div>
        <div class="personal-data personal-data-change">
            <div class="personal-data-links">
                <a href="/profile/edit" class="default-link">
                    Изменить данные
                </a>

                <div class="default-link red-colored js-sign-out">
                    Выйти
                </div>
            </div>

        </div>
    </main>
</div>
    `;
export default pageTemplate;
//# sourceMappingURL=template.js.map
