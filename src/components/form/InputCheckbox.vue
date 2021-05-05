<template>
	<label v-if="inline" class="checkbox-inline">
		<input
		  v-model="modelValue"
		  :value="value"
		  @change="change($event)"
		  :name="name"
		  type="checkbox"
		  class="mr-1"
		>
		<slot></slot>
	</label>
	<div v-else class="checkbox">
		<label>
			<input
			  v-model="modelValue"
			  :value="value"
			  @change="change($event)"
			  :name="name"
			  type="checkbox"
			  class="mr-1"
			>
			<slot></slot>
		</label>
	</div>
</template>

<script>
import {toRefs} from 'vue';

export default {
	name: "InputCheckbox",
	inheritAttrs: true,
	components: {},
	props: {
		name: String,
		modelValue: [String, Number, Array],
		value: [String, Number],
		inline: Boolean
	},
	emits: ['update:modelValue'],
	setup(props) {
		let propRefs = toRefs(props);

		return {
			value: propRefs.value,
			inline: propRefs.inline
		};
	},
	computed: {},
	methods: {
		change($event) {
			console.log('Checkbox change', $event.target.value, this.modelValue);
		}
	},
	mounted() {
	},
	unmounted() {

	}
}
</script>

<style scoped>

</style>