<template>
	<input-radio
	  v-for="(opt, index) in optionsParsed"
	  :key="opt.value"
	  v-model="modelValue"
	  :value="opt.value"
	  @input="$emit('update:modelValue', $event.target.value)"
	  :inline="inline"
	  class="mr-3"
	  v-bind="$attrs"
	>
		{{ opt.text }}
	</input-radio>
</template>

<script>
import FormOptions from "vio/helpers/FormOptions";
import {toRefs} from 'vue';
import InputRadio from 'vio/components/form/InputRadio';

export default {
	name: "OptionsRadio",
	inheritAttrs: false,
	components: {
		InputRadio
	},
	props: {
		name: String,
		modelValue: [String, Number],
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
		optionsParsed() {
			return FormOptions.normalize(this.options);
		}
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
