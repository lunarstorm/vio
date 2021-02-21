<template>
	<div
	  :class="classes"
	  class="alert text-center rounded-0 p-2 m-0 small"
	>
		<strong>
			<slot name="default"></slot>
		</strong>
	</div>
</template>

<script>
import {ref} from 'vue';

export default {
	name: "AlertStrip",
	props: {
		type: {
			type: String,
			default: 'warning'
		},
	},
	setup(props) {
		return {
			type: ref(props.type)
		}
	},
	methods: {},
	computed: {
		classes() {
			return [
				`alert-${this.type}`
			];
		}
	}
}
</script>

<style scoped>

</style>