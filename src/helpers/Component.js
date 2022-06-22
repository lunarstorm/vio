import {h, render} from 'vue';

class ComponentHelper {

    static loadComponent(component, props, el) {
        let vNode = h(ComponentModal, {
            component: component,
            props: {
                ...props,
            },
            onDispose: () => {
                vNode.destroy();
            },
        });

        ComponentHelper.mountVNode(vNode, el);
    }

    static mountVNode(vNode, el) {
        el = el || document.createElement('div');

        vNode.appContext = this.app._context;

        vNode.destroy = () => {
            if (el) {
                render(null, el);
            }

            el = null;
            vNode = null;
        };

        render(vNode, el);

        return vNode;
    }

}

export default ComponentHelper;