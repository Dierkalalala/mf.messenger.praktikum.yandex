let template = `
        {{#messages}}
                                {{#is_my_message}}
                                      <article class="my-messages-wrapper">
                                        <div class="my-message my-text-message small-message">
                                            <p>
                                                {{{message}}}
                                            </p>
                                            <div class="additional-params">
                                                <div class="is-message-read">
                                                    <svg width="10" height="4">
                                                        <use xlink:href="#read_icon"></use>
                                                    </svg>
                                                </div>
                                                <div class="time">
                                                    {{time}}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                {{/is_my_message}}
                                {{^is_my_message}}
                                      {{#is_image}}
                                      <article>
                                            <div class="interlocutor-message interlocutor-message-img">
                                                <img src="{{src}}" alt="">
                                            </div>
                                       </article>
                                      {{/is_image}}
                                      {{^is_image}}
                                       <article class="interlocutor-messages-wrapper">
                                            <div class="interlocutor-message interlocutor-text-message">
                                                <p>
                                                    {{{message}}}
                                                </p>
                                                <div class="time">
                                                    {{{time}}}
                                                </div>
                                            </div>
                                      </article>
                                       {{/is_image}}
                                {{/is_my_message}}
                                {{#is_my_message}}

                                {{/is_my_message}}
         {{/messages}}
`
export default template
