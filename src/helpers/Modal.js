import {h, ref, render} from 'vue';

import VioModal from "vio/components/modal/Modal";
import ComponentModal from "vio/components/modal/ComponentModal";

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
		this.mountVNode(vNode);
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
			props: {
				...props,
			},
			onDispose: () => {
				vNode.destroy();
			}
		});

		this.mountVNode(vNode);
	}

	mountVNode(vNode) {
		let el = document.createElement('div');

		vNode.appContext = this.app._context;

		vNode.destroy = () => {
			if (el) {
				render(null, el);
			}

			el = null;
			vNode = null;
		}

		render(vNode, el);

		return vNode;
	}
}

export default new Modal();