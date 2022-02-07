<template>
	<input
	  :value="modelValue"
	  @change="$emit('update:modelValue', $event.target.value)"
	  ref="field"
	  type="text"
	  class="form-control"
	/>
</template>

<script>
import flatpickr from "flatpickr";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect";

import {toRefs} from 'vue';
console.log(monthSelectPlugin)
export default {
	name: "InputMonth",
	components: {},
	props: {
		modelValue: [String, Object],
		options: {
			type: Object,
			default: {}
		}
	},
	emits: ['update:modelValue'],
	setup(props) {
		let propRefs = toRefs(props);
		let FP = null;

		return {
			options: propRefs.options,
			FP
		};
	},
	computed: {
	},
	methods: {},
	created() {
	},
	mounted() {
		let $field = this.$refs.field;

		this.FP = flatpickr($field, {
			...this.options,
			allowInput: true,
			plugins:[new monthSelectPlugin({
				dateFormat: 'Y-m',
			})],
		});

	},
	updated(){
		this.FP.setDate(this.modelValue, true);
	},
	unmounted() {
		if (this.FP) {
			this.FP.destroy();
		}
	}
}
</script>

<style scoped>

</style>