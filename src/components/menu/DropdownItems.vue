<template>
	<component
	  v-for="item in components"
	  :is="item.component"
	  v-bind="item.props"
	>
		<i
		  v-if="item.icon"
		  :class="item.icon"
		  class="fa fa-fw"
		></i>
		{{ item.text }}
	</component>
</template>

<script>
import {defineAsyncComponent, toRefs} from 'vue';

const DropdownAction = defineAsyncComponent(() => import('./DropdownAction'));
const DropdownLink = defineAsyncComponent(() => import('./DropdownLink'));
const DropdownDivider = defineAsyncComponent(() => import('./DropdownDivider'));
const DropdownText = defineAsyncComponent(() => import('./DropdownText'));
const DropdownHeader = defineAsyncComponent(() => import('./DropdownHeader'));

export default {
	name: "DropdownItems",
	props: {
		items: {
			type: Array,
			default: []
		}
	},
	components: {
		DropdownAction,
		DropdownLink,
		DropdownDivider,
		DropdownText,
		DropdownHeader
	},
	setup(props) {

		return {
			items: toRefs(props).items
		}
	},
	computed: {
		components() {
			let comps = [];

			this.items.forEach(item => {
				comps.push(this.detectComponent(item));
			});

			return comps;
		}
	},
	mounted() {
	},
	methods: {
		detectComponent(item) {
			if (typeof item === "string") {

				switch (item) {
					case '---':
						return {
							component: 'dropdown-divider',
							props: {},
							...item
						};
				}

				return {
					component: 'dropdown-text',
					props: {},
					...item
				};
			}

			if (item.header) {
				return {
					component: 'dropdown-header',
					props: {},
					...item
				};
			}

			if (item.href) {
				return {
					component: 'dropdown-link',
					props: {
						href: item.href,
						target: item.target
					},
					...item
				};
			}

			return {
				component: 'dropdown-action',
				props: {
					handler: item.fn
				},
				...item
			}
		}
	}
}
</script>

<style scoped>

</style>