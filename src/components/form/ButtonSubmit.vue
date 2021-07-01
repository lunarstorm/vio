<template>
	<button
	  type="submit"
	  class="btn btn-primary"
	  :disabled="busy"
	>
		<span v-if="busy" class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>
		<slot>Submit</slot>
	</button>
</template>

<script>
export default {
	name: "ButtonSubmit",
	inheritAttrs: true,
	props: {
		busy: Boolean
	}
}
</script>

<style scoped>

</style>