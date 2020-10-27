interface Props{
    messages: Array<Prop>
}

type Prop = {
    is_image: boolean,
    is_my_message: boolean,
    time: string,
    message?: string,
    src?: string
}

import Block from '../../../vendor/block/index'
import '../../../vendor/templator/index';
import template from './template';
import * as Mustache from '../../../typings/mustache';

class Messages extends Block {
    constructor(props: Props) {
        super("div", props);
    }

    render() {

        return Mustache.render(template, this.props);
    }
}


export default Messages
