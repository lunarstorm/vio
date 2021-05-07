<template>
	<div
	  class="tile tile-circle"
	  :style="styles"
	>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "ConversationAvatar",
	inheritAttrs: true,
	props: {
		style: [Object, Array]
	},
	computed: {
		styles() {
			let styles = {};

			if (this.style['background-color']) {
				styles['background-color'] = this.style['background-color'];
			}

			if (this.style['color']) {
				styles['color'] = this.style['color'];
			}

			return styles;
		}
	}
}
</script>

<style scoped>

</style>