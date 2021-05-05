<template>
	<input-checkbox
	  v-for="(opt, index) in optionsParsed"
	  :key="index"
	  v-model="modelValue"
	  :value="opt.value"
	  @change="change($event)"
	  :inline="inline"
	>
		{{ opt.text }}
	</input-checkbox>

	<pre>{{ modelValue }}</pre>
</template>

<script>
import FormOptions from "vio/helpers/FormOptions";
import {toRefs} from 'vue';
import InputCheckbox from 'vio/components/form/InputCheckbox';

export default {
	name: "OptionsCheckbox",
	inheritAttrs: true,
	components: {
		InputCheckbox
	},
	props: {
		name: String,
		modelValue: [String, Number, Array],
		options: {
			type: [Array, Object],
			default: []
		},
		inline: Boolean
	},
	emits: ['update:modelValue'],
	setup(props) {
		return {
			options: toRefs(props).options,
			inline: props.inline
		};
	},
	computed: {
		optionsParsed(){
			return FormOptions.normalize(this.options);
		}
	},
	methods: {
		change($event){
			console.log('Options Checkbox change', $event.target.value, this.modelValue);
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