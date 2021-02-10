<template>
	<div class="btn-group">
		<button
		  v-bind="$attrs"
		  type="button"
		  class="btn btn-default dropdown-toggle"
		  data-toggle="dropdown"
		>
			<slot>Actions</slot>
		</button>
		<div class="dropdown-menu dropdown-menu-right" role="menu">
			<dropdown-items :items="items"></dropdown-items>
		</div>
	</div>
</template>

<script>
import {ref, toRefs} from 'vue';
import DropdownItems from './DropdownItems.vue';

export default {
	name: "ButtonMenu",
	inheritAttrs: false,
	props: {
		items: {
			type: Array,
			default: []
		}
	},
	components: {
		DropdownItems
	},
	setup(props) {

		return {
			items: toRefs(props).items
		}
	},
	computed: {
	},
	mounted() {
	}
}
</script>

<style scoped>

</style>