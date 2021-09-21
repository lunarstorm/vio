import { h, ref, render, watch } from 'vue';

import VioModal from "vio/components/modal/Modal";
import ComponentWrapper from "vio/components/modal/ComponentWrapper";

class Modal {

    constructor(config) {
        this.config = {
            title: '',
            center: false,
            ...config
        };
    }

    static make(config) {
        return new Modal(config);
    }

    static isOpen() {
        let isOpen = (window.$Modal && window.$Modal.isOpen);
        window._modalCount = window._modalCount || 0;

        return isOpen || window._modalCount > 0;
    };

    static addInsanceToStack(modal) {
        Modal.stack.push(modal);
    };

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

    size(size) {
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
            props: props,
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

/**
 * For storing references to currently active
 * <modal>'s
 */
Modal.stack = ref([]);

watch(() => Modal.stack, (value) => {
    console.log("Modal stack changed:", value);
});

export default Modal;
