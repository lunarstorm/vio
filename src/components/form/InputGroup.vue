<template>
	<div class="input-group">
		<div v-if="!!$slots.start" class="input-group-prepend">
			<slot name="start"></slot>
		</div>
		<div v-if="!!$slots.before" class="input-group-prepend">
			<span class="input-group-text"><slot name="before"></slot></span>
		</div>
		<slot></slot>
		<div v-if="!!$slots.after" class="input-group-append">
			<span class="input-group-text"><slot name="after"></slot></span>
		</div>
		<div v-if="!!$slots.end" class="input-group-append">
			<slot name="end"></slot>
		</div>
	</div>
</template>

<script>

export default {
	name: "InputGroup",
	inheritAttrs: true,
	components: {},
	props: {},
	setup(props) {
		return {};
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