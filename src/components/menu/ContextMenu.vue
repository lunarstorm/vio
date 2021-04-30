<template>
	<div v-if="items.length > 0" class="btn-group">
		<button type="button" class="btn btn-secondary" data-toggle="dropdown">
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
		},
		firstItemParams(){
			let params = {};

			if(this.firstItem){


			}

			return parmas
		}
	},
	mounted() {
	}
}
</script>

<style scoped>

</style>