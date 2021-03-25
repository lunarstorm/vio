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
import MultiSelect from '@vueform/multiselect';
import "@vueform/multiselect/themes/default.css";
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
		}
	},
	setup(props) {
		return {};
	},
	computed: {
		optionsNormalized() {
			if(typeof this.options === "function"){
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