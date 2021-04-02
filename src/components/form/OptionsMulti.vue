<template>
	<multi-select
	  v-model="modelValue"
	  @change="$emit('update:modelValue', $event)"
	  :options="optionsNormalized"
	  :searchable="true"
	>
		<slot></slot>
	</multi-select>
</template>

<script>
import "@vueform/multiselect/themes/default.scss";
import MultiSelect from '@vueform/multiselect';
import FormOptions from "vio/helpers/FormOptions";

export default {
	name: "OptionsMulti",
	inheritAttrs: true,
	components: {
		MultiSelect
	},
	emits: ['update:modelValue'],
	props: {
		modelValue: [String, Number],
		options: {
			type: [Array, Object, Function],
			defaultValue: []
		},
		async: Boolean
	},
	setup(props) {
		return {};
	},
	computed: {
		optionsNormalized() {
			if(this.async){
				return this.options;
			}

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