import {createApp, defineAsyncComponent} from 'vue';

const VioDialog = defineAsyncComponent(() => import('vio/components/modal/Dialog'));

class Dialog {
	constructor() {
		this.component = VioDialog;
	}

	confirm(o){
		o = {
			title: 'Confirm',
			message: 'Are you sure?',
			...o
		};

		const div = document.createElement('div');
		$('body').append(div)
		createApp(this.component, o).mount(div)
	}
}

export default new Dialog();