<template>
	<multi-select
	  v-model="modelValue"
	  @change="$emit('update:modelValue', $event)"
	>
		<slot></slot>
	</multi-select>
</template>

<script>
import MultiSelect from '@vueform/multiselect';

import "@vueform/multiselect/themes/default.css";

export default {
	name: "OptionsMulti",
	inheritAttrs: true,
	components: {
		MultiSelect
	},
	emits: ['update:modelValue'],
	props: {
		modelValue: String,
	},
	setup(props) {
		return {
		};
	},
	computed: {
	},
	methods: {},
	mounted() {
	},
	unmounted() {
	}
}
</script>

<style scoped>

</style>