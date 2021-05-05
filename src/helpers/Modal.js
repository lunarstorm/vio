import {createApp, defineAsyncComponent} from 'vue';

const VioModal = defineAsyncComponent(() => import('vio/components/modal/Modal'));

class Modal {
	constructor() {
		this.component = VioModal;
	}

	show(o){
		o = {
			title: 'Modal',
			content: 'Hey!',
			footer: null,
			center: false,
			...o
		};

		const div = document.createElement('div');
		$('body').append(div)
		createApp(this.component, o).mount(div)
	}

	centered(o){
		this.show({
			center: true,
			...o
		});
	}
}

export default new Modal();