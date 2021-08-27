import { h, ref, render } from 'vue';

import VioModal from "vio/components/modal/Modal";
import ComponentWrapper from "vio/components/modal/ComponentWrapper";

class Modal {
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

    center(toggle) {
        this.config.center = typeof toggle === 'undefined' ? true : toggle;
        return this;
    }

    static(toggle) {
        this.config.static = typeof toggle === 'undefined' ? true : toggle;
        return this;
    }

    scroll(toggle) {
        this.config.scroll = typeof toggle === 'undefined' ? true : toggle;
        return this;
    }

    title(text) {
        this.config.title = text;
        return this;
    }

    title(size) {
        this.config.size = size;
        return this;
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
        let vNode = h(ComponentWrapper, {
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

    component(component, props, modalConfig) {
        let vNode = h(ComponentWrapper, {
            component: component,
            props: {
                ...props,
            },
            onDispose: () => {
                vNode.destroy();
            },
            modalProps: {
                ...this.config,
                ...modalConfig
            }
        });

        this.mountVNode(vNode);

        return vNode.component.ctx;
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
