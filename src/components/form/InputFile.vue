<template>
<div class="custom-file">
	<input
	  @change="onFileChange($event.target.files)"
	  ref="field"
	  type="file"
	  class="custom-file-input"
	/>
	<label class="custom-file-label">Choose file</label>
</div>
</template>

<script>
import flatpickr from "flatpickr";
import {toRefs} from 'vue';

export default {
	name: "InputFile",
	components: {},
	props: {
		modelValue: [String, Object],
		files: Array,
		onFileChange: Function,
		options: {
			type: Object,
			default: {}
		}
	},
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

		this.FP = $field;
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