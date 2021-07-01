import {defineAsyncComponent, h, ref, render} from 'vue';

const VioModal = defineAsyncComponent(() => import('vio/components/modal/Modal'));
const ComponentModal = defineAsyncComponent(() => import('vio/components/modal/ComponentModal'));

class Modal {
	constructor(app) {
		this.component = VioModal;
		this.stack = ref([]);
	}

	setApp(app) {
		this.app = app;
	}

	show(o) {
		o = {
			title: 'Modal',
			content: 'Hey!',
			footer: null,
			center: false,
			...o
		};

		let vNode = h(VioModal, o);
		vNode.appContext = this.app._context;

		let el = document.createElement('div');
		render(vNode, el);
	}

	centered(o) {
		this.show({
			center: true,
			...o
		});
	}

	loadComponent(component, props) {
		let vNode = h(ComponentModal, {
			component: component,
			props: props
		});
		vNode.appContext = this.app._context;

		let el = document.createElement('div');
		render(vNode, el);
	}
}

export default new Modal();