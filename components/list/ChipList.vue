<template>
	<ul class="list-inline">
		<template v-for="item in items">
			<li v-if="item.text" class="list-inline-item">
				<text-chip :label="item.label">{{ item.text }}</text-chip>
			</li>
		</template>
	</ul>
</template>

<script>
import TextChip from "../text/TextChip";

export default {
	name: "ChipList",
	props: {
		items: Array
	},
	components: {
		TextChip
	},
	setup(props) {
		return {
			items: props.items
		}
	},
	mounted() {
	},
	computed: {
	},
	methods: {}
}
</script>

<style scoped>

</style>