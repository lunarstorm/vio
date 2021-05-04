import {createApp, defineAsyncComponent} from 'vue';

const VioDialog = defineAsyncComponent(() => import('vio/components/modal/Dialog'));

class Dialog {
	constructor() {
		this.component = VioDialog;
	}

	show(o) {
		o = {
			title: '',
			message: '',
			...o
		};

		const div = document.createElement('div');
		$('body').append(div);
		createApp(this.component, o).mount(div);
	}

	confirm(o) {
		o = {
			title: 'Confirm',
			message: 'Are you sure?',
			...o
		};

		this.show(o);
	}

	confirmCenter(o) {
		this.confirm({
			center: true,
			...o
		});
	}
}

export default new Dialog();