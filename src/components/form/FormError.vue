<template>
	<div
	  v-if="modelValue"
	  class="form-text text-danger"
	>
		{{ modelValue }}
	</div>
</template>

<script>
export default {
	name: "FormError",
	inheritAttrs: true,
	components: {},
	props: {
		modelValue: [String, Number],
	},
	setup(props) {
		return {
		};
	},
	computed: {},
	methods: {},
	mounted() {

	},
	unmounted() {
	}
}
</script>

<style scoped>

</style>