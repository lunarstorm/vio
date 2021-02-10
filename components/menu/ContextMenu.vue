<template>
	<div v-if="items.length > 0" class="btn-group">
		<a
		  v-if="firstItem"
		  @click.prevent="firstItem.fn"
		  :title="firstItem.text"
		  href="#"
		  class="btn btn-default"
		>
			<i :class="firstItem.icon" class="fa fa-fw"></i>
		</a>
		<button type="button" class="btn btn-default" data-toggle="dropdown">
			<i class="fa fa-ellipsis-h"></i>
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
	name: "ContextMenu",
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
		firstItem() {
			if(this.items.length > 0){
				return this.items[0];
			}

			return null;
		}
	},
	mounted() {
	}
}
</script>

<style scoped>

</style>