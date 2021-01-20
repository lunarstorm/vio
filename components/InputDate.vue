<template>
	<input
	  :value="modelValue"
	  @input="$emit('update:modelValue', $event.target.value)"
	  ref="field"
	  type="text"
	  class="form-control"
	/>
</template>

<script>
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const DATE_FORMAT = 'yyyy-MM-dd';
let FP = null;

export default {
	name: "InputDate",
	components: {},
	props: {
		modelValue: String
	},
	emits: ['update:modelValue'],
	setup(props) {
		return {
			//modelValue: props.modelValue,
		};
	},
	computed: {},
	methods: {},
	mounted() {
		let self = this;
		let dateValue = this.modelValue;

		FP = flatpickr(this.$refs.field, {
			allowInput: true,
			defaultDate: dateValue,
			onChange: function (selectedDates, dateStr, instance) {
				//dateValue = dateStr;
				//self.$emit('update:modelValue', dateStr);
			}
		});
	},
	unmounted() {
		if (FP) {
			FP.destroy();
		}
	}
}
</script>

<style scoped>

</style>