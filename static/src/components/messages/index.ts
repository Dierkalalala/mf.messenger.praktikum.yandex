import Block from '../../../vendor/block/index.js'
import '../../../vendor/templator/index.js';
import template from './template.js';
import * as Mustache from '../../../typings/mustache';

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



class Messages extends Block {
    constructor(props: Props) {
        super("div", props);
    }

    render() {

        return Mustache.render(template, this.props);
    }
}


export default Messages
