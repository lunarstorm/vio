<template>
	<input
	  :value="modelValue"
	  @input="$emit('update:modelValue', $event.target.value)"
	  ref="field"
	  type="text"
	  class="form-control"
	/>
</template>

<script>

import {unref} from "vue";

export default {
	name: "InputText",
	inheritAttrs: true,
	components: {},
	props: {
		modelValue: String,
	},
	emits: ['update:modelValue'],
	setup(props) {
		return {
			options: props.options
		};
	},
	computed: {},
	methods: {},
	mounted() {

	},
	unmounted() {
	}
}
</script>

<style scoped>

</style>