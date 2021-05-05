<template>
	<div class="btn-group vio-options-button">
		<button
		  v-bind="$attrs"
		  type="button"
		  class="btn btn-secondary dropdown-toggle"
		  data-toggle="dropdown"
		>
			<slot class="mr-1"></slot>
			<strong>{{ selectedLabel }}</strong>
		</button>
		<div :class="cssDropdownMenu" class="dropdown-menu" role="menu">
			<a
			  v-if="nullOption"
			  @click="$emit('update:modelValue', nullValue)"
			  href="#"
			  class="dropdown-item"
			>
				<faux-checkbox :checked="modelValue == nullValue"></faux-checkbox>
				{{ nullText }}
			</a>
			<a
			  v-for="(opt, index) in optionsParsed"
			  :key="index"
			  @click="$emit('update:modelValue', opt.value)"
			  href="#"
			  class="dropdown-item"
			>
				<faux-checkbox :checked="modelValue == opt.value"></faux-checkbox>
				{{ opt.text }}
			</a>
		</div>
	</div>
</template>

<script>
import {toRefs} from 'vue';
import FormOptions from "vio/helpers/FormOptions";
import InputRadio from 'vio/components/form/InputRadio';
import DropdownItem from "../menu/DropdownItem";
import FauxCheckbox from "./FauxCheckbox";
import _ from 'lodash';

export default {
	name: "OptionsButton",
	inheritAttrs: false,
	components: {
		InputRadio,
		DropdownItem,
		FauxCheckbox
	},
	props: {
		name: String,
		modelValue: [String, Number],
		options: {
			type: [Array, Object],
			default: []
		},
		nullOption: {
			type: Boolean,
			default: false
		},
		nullText: {
			type: String,
			default: 'None'
		},
		nullValue: {
			type: [String, Number],
			default: ''
		},
		align: {
			type: String,
			default: 'left'
		}
	},
	emits: ['update:modelValue'],
	setup(props) {
		return {
			options: toRefs(props).options,
			nullOption: props.nullOption,
			align: props.align
		};
	},
	computed: {
		selectedLabel() {
			if (this.modelValue == this.nullValue) {
				return this.nullText;
			}

			let label = this.modelValue;

			_.forEach(this.optionsParsed, (opt, key) => {
				if (this.modelValue == opt.value) {
					label = opt.label;
					return true;
				}
			});

			return label || this.nullText;
		},
		cssDropdownMenu() {
			let classes = [];

			if (this.align == 'right') {
				classes.push('dropdown-menu-right');
			}

			return classes;
		},
		optionsParsed() {
			return FormOptions.normalize(this.options);
		},
		menuItems() {
			let opts = this.optionsParsed;

			console.log('menuItems', opts);

			return [];
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
.vio-options-button .form-inline label {
	justify-content: normal !important;
}
</style>