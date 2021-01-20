<template>
	<button
	  :disabled="isSpinning"
	  type="submit"
	  class="btn btn-primary"
	>
		<span
		  v-if="isSpinning"
		  class="py-0 my-0 spinner-border spinner-border-sm"
		  role="status"
		  aria-hidden="true"
		></span>
		<slot>Submit</slot>
	</button>
</template>

<script>
import {toRefs} from 'vue';

export default {
	name: "ButtonSubmit",
	props: {
		spin: Boolean,
	},
	setup(props) {
		let spin = toRefs(props).spin;

		return {
			spin,
		}
	},
	computed: {
		isSpinning() {
			return this.spin;
		}
	},
	methods: {}
}
</script>

<style scoped>

</style>