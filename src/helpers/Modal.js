import { h, ref, render } from 'vue';

import VioModal from "vio/components/modal/Modal";
import ComponentModal from "vio/components/modal/ComponentModal";

class Modal {
    constructorOld(app) {
        this.component = VioModal;
        this.stack = ref([]);
    }

    constructor(config) {
        this.stack = ref([]);

        this.config = {
            title: '',
            center: false,
            ...config
        };
    }

    static make(config) {
        return new Modal(config);
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

    static loadComponent(component, props, modalProps) {
        let vNode = h(ComponentModal, {
            component: component,
            props: {
                ...props,
            },
            onDispose: () => {
                vNode.destroy();
            },
            modalProps: modalProps
        });

        Modal.make().mountVNode(vNode);
    }

    mountVNode(vNode) {
        let el = document.createElement('div');

        vNode.appContext = Modal.app._context;

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

Modal.app = null;

export default Modal;
