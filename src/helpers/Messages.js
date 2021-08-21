import {defineAsyncComponent, h, ref, render} from 'vue';

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

		this.info = (text) => {
			this.push({
				message: text,
				level: 'info'
			});
		}

		this.success = (text) => {
			this.push({
				message: text,
				level: 'success'
			});
		}

		this.warning = (text) => {
			this.push({
				message: text,
				level: 'warning'
			});
		}

		this.danger = (text) => {
			this.push({
				message: text,
				level: 'danger'
			});
		}
	}

	setApp(app) {
		this.app = app;
		this.mount();
	}

	mount(){
		let vNode = h(MessageContainer);
		vNode.appContext = this.app._context;

		let el = document.createElement('div');
		render(vNode, el);
		$('body').append(el);
	}
}

export default new Messages();