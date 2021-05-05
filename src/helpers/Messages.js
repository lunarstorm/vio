import {createApp, defineAsyncComponent, ref} from 'vue';

const MessageContainer = defineAsyncComponent(() => import('vio/components/notification/MessageContainer'));

class Messages {
	constructor() {
		const queue = ref([]);
		this.queue = queue;
		//this.seen = ref([]);
		this.mount();

		this.push = (message) => {
			message = {
				level: 'info',
				title: '',
				message: '',
				...message
			}

			queue.value.push(message);
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

	mount(){
		const div = document.createElement('div');
		$('body').append(div);
		createApp(MessageContainer).mount(div);
	}
}

export default new Messages();