<template>
	<multi-select
	  v-model="modelValue"
	  @change="$emit('update:modelValue', $event)"
	  :options="optionsNormalized"
	  :searchable="true"
	  :placeholder="_placeholder"
      :close-on-select="true"
	  ref="multiselect"
	>
		<slot></slot>
	</multi-select>
</template>

<script>
import "@vueform/multiselect/themes/default.scss";
import MultiSelect from '@vueform/multiselect';
import FormOptions from "vio/helpers/FormOptions";
import _ from 'lodash';

export default {
	name: "OptionsMulti",
	inheritAttrs: true,
	components: {
		MultiSelect,
	},
	emits: ['update:modelValue'],
	props: {
		modelValue: [String, Number, Array],
		placeholder: [String, Number],
		options: {
			type: [Array, Object, Function],
			defaultValue: []
		},
		async: Boolean,
		clearOption: {
			type: Boolean,
			defaultValue: true
		}
	},
	setup(props) {
		return {};
	},
	computed: {
		optionsNormalized() {
			if (this.async) {
				return this.options;
			}

			return FormOptions.normalize(this.options);
		},
		selectedValueExists() {
			if (!this.modelValue) {
				return true;
			}

			let opts = this.optionsNormalized;
			let index = _.findIndex(opts, item => {
				if(!item){
					return false;
				}

				return item.value == this.modelValue;
			})
			return index > -1;
		},
		_placeholder() {
			if (!this.selectedValueExists) {
				return `${this.modelValue}`;
			}

			return this.placeholder;
		}
	},
	methods: {
		clear() {
			this.$refs.multiselect.clear()
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
