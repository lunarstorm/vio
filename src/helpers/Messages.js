import { defineAsyncComponent, h, ref, render } from 'vue';

const MessageContainer = defineAsyncComponent(() => import('vio/components/notification/MessageContainer'));

class Messages {
    constructor() {
        const queue = ref([]);
        this.queue = queue;
        //this.seen = ref([]);
        this.push = (message) => {
            message = {
                level: 'info',
                title: '',
                message: '',
                position: 'top',
                ...message
            }

            queue.value.push(message);
        }

        this.pop = () => {
            return queue.value.shift();
        }

        this.hasItems = () => {
            return queue.value.length > 0;
        }

        this.info = (text, options) => {
            this.push({
                message: text,
                level: 'info',
                ...options
            });
        }

        this.success = (text, options) => {
            this.push({
                message: text,
                level: 'success',
                ...options
            });
        }

        this.warning = (text, options) => {
            this.push({
                message: text,
                level: 'warning',
                ...options
            });
        }

        this.danger = (text, options) => {
            this.push({
                message: text,
                level: 'danger',
                ...options
            });
        }

        this.error = (text, options) => {
            this.danger(text, options);
        }
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

export default new Messages();
