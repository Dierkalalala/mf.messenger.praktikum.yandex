let template:string = `
    <div class="page-center">
        <div class="error-text-block-wrapper text-center">
            <h1 class="error-title">
                {{code}}
            </h1>
            <h3 class="error-subtitle">
                {{message}}
            </h3>

            <a href="{{href}}" class="default-link">{{link_message}}</a>

        </div>
    </div>
`
export default template
