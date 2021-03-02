<template>
	<ul class="list-inline">
		<template v-for="item in itemsParsed">
			<li v-if="item.value" class="list-inline-item">
				<text-chip :label="item.label">{{ item.value }}</text-chip>
			</li>
		</template>
	</ul>
</template>

<script>
import TextChip from "../text/TextChip";
import {toRefs} from 'vue';
import FormOptions from "../../helpers/FormOptions";

export default {
	name: "ChipList",
	props: {
		items: [Array, Object]
	},
	components: {
		TextChip
	},
	setup(props) {
		return {
			items: toRefs(props).items
		}
	},
	mounted() {
	},
	computed: {
		itemsParsed(){
			return FormOptions.normalize(this.items);
		}
	},
	methods: {}
}
</script>

<style scoped>

</style>