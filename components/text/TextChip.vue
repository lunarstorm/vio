<template>
	<div class="chip badge badge-light badge-pill p-2 shadow-sm valign-middle">
		<span v-if="label" class="chip-label small text-muted mr-1">{{ label }}</span>
		<slot></slot>
	</div>
</template>

<script>
import {toRefs, ref} from 'vue';

export default {
	name: "TextChip",
	props: {
		label: String
	},
	components: {},
	setup(props) {
		let propRefs = toRefs(props);
		return {
			label: propRefs.label
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
.chip {
	font-size: inherit !important;
	font-weight: normal;
}
.chip-label {

}
</style>