import {defineAsyncComponent, h, render} from 'vue';

const VioDialog = defineAsyncComponent(() => import('vio/components/modal/Dialog'));

class Dialog {
	constructor(config) {
		this.component = VioDialog;

		this.config = {
			title: '',
			message: '',
			level: 'info',
			onYes: () => false,
			onClose: () => false,
			center: false,
			...config
		};
	}

	static make(config){
		return new Dialog(config);
	}

	static confirm(o) {
		o = {
			title: 'Confirm',
			message: 'Are you sure?',
			...o
		};

		return Dialog.make(o).show();
	}

	static confirmCenter(o) {
		return Dialog.confirm({
			center: true,
			...o
		});
	}

	show(o) {
		this.config = {
			...this.config,
			...o
		};

		let vNode = h(VioDialog, this.config);
		vNode.appContext = Dialog.app._context;

		let el = document.createElement('div');
		render(vNode, el);
		$('body').append(el);
	}

	center(){
		this.config.center = true;
		return this;
	}

	title(title) {
		this.config.title = title;
		return this;
	}

	message(message){
		this.config.message = message;
		return this;
	}

	ask(message){
		return this.message(message);
	}

	level(level){
		this.config.level = level;
		return this;
	}

	danger(){
		return this.level('danger');
	}

	warning() {
		return this.level('warning');
	}

	info() {
		return this.level('info');
	}

	success() {
		return this.level('success');
	}

	onYes(callback){
		this.config.onYes = () => {
			callback(this);
		}
		return this;
	}

	onClose(callback){
		this.config.onClose = () => {
			callback(this);
		}
		return this;
	}
}

Dialog.app = null;

export default Dialog;