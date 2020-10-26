interface Dic {
    [key: string]: unknown
}
import Block from '../../../vendor/block/index.js'
import '../../../vendor/templator/index.js';
import template from './template.js';
class Messages extends Block {
    constructor(props: Dic) {
        super("div", props);
    }

    render() {
        // @ts-ignore
        return Mustache.render(template, this.props);
    }
}


export default Messages
