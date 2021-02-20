<template>
	<label v-for="opt in optionsParsed" class="radio-inline">
		<input
		  v-model="modelValue"
		  :name="name"
		  :value="opt.value"
		  type="radio"
		>
		{{ opt.text }}
	</label>
</template>

<script>
import FormOptions from "vio/helpers/FormOptions";

export default {
	name: "OptionsRadio",
	components: {},
	props: {
		name: String,
		modelValue: String,
		options: {
			type: [Array, Object],
			default: []
		}
	},
	setup(props) {
		return {
			options: props.options
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