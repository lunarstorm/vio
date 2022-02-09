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
		onFileChange: Function,
	},
	setup(props) {
		let propRefs = toRefs(props);
		return {
			options: propRefs.options,
		};
	},
}
</script>

<style scoped>

</style>