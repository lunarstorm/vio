<template>
	<select
	  v-model="modelValue"
	  :name="name"
	  class="form-control"
	>
		<option v-if="placeholder" :value="null" disabled>{{ caption }}</option>
		<option
		  v-for="opt in optionsParsed"
		  :value="opt.value"
		>
			{{ opt.text }}
		</option>
	</select>
</template>

<script>
import FormOptions from "vio/helpers/FormOptions";

export default {
	name: "OptionsSelect",
	components: {},
	props: {
		name: {
			type: String,
			default: ''
		},
		placeholder: {
			type: Boolean,
			default: true
		},
		caption: {
			type: String,
			default: 'Select an option'
		},
		modelValue: String,
		options: {
			type: [Array, Object],
			default: []
		}
	},
	setup(props) {
		return {
			options: props.options,
			caption: props.caption
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