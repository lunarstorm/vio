<template>
  <component
    :is="item.component"
    v-for="item in components"
    v-bind="item.props"
  >
    <i
      v-if="item.icon"
      :class="item.icon"
      class="fa fa-fw"
    />
    {{ item.text }}
  </component>
</template>

<script>
import { defineAsyncComponent, toRefs } from 'vue';

const DropdownAction = defineAsyncComponent(() => import('./DropdownAction.vue'));
const DropdownLink = defineAsyncComponent(() => import('./DropdownLink.vue'));
const DropdownDivider = defineAsyncComponent(() => import('./DropdownDivider.vue'));
const DropdownText = defineAsyncComponent(() => import('./DropdownText.vue'));
const DropdownHeader = defineAsyncComponent(() => import('./DropdownHeader.vue'));

export default {
    name: 'DropdownItems',
    components: {
        DropdownAction,
        DropdownLink,
        DropdownDivider,
        DropdownText,
        DropdownHeader,
    },
    props: {
        items: {
            type: Array,
            default: [],
        },
    },
    setup(props) {

        return {
            items: toRefs(props).items,
        };
    },
    computed: {
        components() {
            let comps = [];

            this.items.forEach(item => {
                comps.push(this.detectComponent(item));
            });

            return comps;
        },
    },
    mounted() {
    },
    methods: {
        detectComponent(item) {
            if (typeof item === 'string') {

                switch (item) {
                case '---':
                    return {
                        component: 'dropdown-divider',
                        props: {},
                        ...item,
                    };
                }

                return {
                    component: 'dropdown-text',
                    props: {},
                    ...item,
                };
            }

            if (item.header) {
                return {
                    component: 'dropdown-header',
                    props: {},
                    ...item,
                };
            }

            if (item.href) {
                return {
                    component: 'dropdown-link',
                    props: {
                        href: item.href,
                        target: item.target,
                    },
                    ...item,
                };
            }

            return {
                component: 'dropdown-action',
                props: {
                    handler: item.fn,
                },
                ...item,
            };
        },
    },
};
</script>

<style scoped>

</style>