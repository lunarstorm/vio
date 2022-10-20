import { defineAsyncComponent, h, ref, render } from 'vue';
import Message from 'vio/helpers/Message';

const MessageContainer = defineAsyncComponent(() => import('vio/components/notification/MessageContainer.vue'));
class Messages {

    constructor() {
        const queue = ref([]);
        this.queue = queue;

        this.push = (message) => {
            if (!(message instanceof Message)) {
                message = Message.make(message);
            }

            queue.value.push(message);
        };

        this.make = (config) => {
            return Message.make(config);
        };

        this.pop = () => {
            return queue.value.shift();
        };

        this.remove = message => {
            _.remove(queue.value, item => item.data.id == message.data.id);
        };

        this.hasItems = () => {
            return queue.value.length > 0;
        };

        this.info = (text, options) => {
            this.push({
                text: text,
                level: Message.LEVEL_INFO,
                ...options,
            });
        };

        this.success = (text, options) => {
            this.push({
                text: text,
                level: Message.LEVEL_SUCCESS,
                ...options,
            });
        };

        this.warning = (text, options) => {
            this.push({
                text: text,
                level: Message.LEVEL_WARNING,
                ...options,
            });
        };

        this.danger = (text, options) => {
            this.push({
                text: text,
                level: Message.LEVEL_DANGER,
                ...options,
            });
        };

        this.error = (text, options) => {
            this.danger(text, options);
        };
    }

    setApp(app) {
        this.app = app;
        this.mount();
    }

    mount() {
        let vNode = h(MessageContainer);
        vNode.appContext = this.app._context;

        let el = document.createElement('div');
        render(vNode, el);
        $('body').append(el);
    }
}

const messages = new Messages();

export default messages;
