<template>
	<label v-for="opt in optionsParsed" class="radio-inline">
		<input
		  v-model="modelValue"
		  :value="opt.value"
		  @input="$emit('update:modelValue', $event.target.value)"
		  :name="name"
		  type="radio"
		>
		{{ opt.text }}
	</label>
</template>

<script>
import FormOptions from "vio/helpers/FormOptions";
import {toRefs} from 'vue';

export default {
	name: "OptionsRadio",
	components: {},
	props: {
		name: String,
		modelValue: [String, Number],
		options: {
			type: [Array, Object],
			default: []
		}
	},
	emits: ['update:modelValue'],
	setup(props) {
		return {
			options: toRefs(props).options
		};
	},
	computed: {
		optionsParsed(){
			return FormOptions.normalize(this.options);
		}
	},
	methods: {},
	mounted() {
		let self = this;
		let dateValue = this.modelValue;
	},
	unmounted() {

	}
}
</script>

<style scoped>

</style>