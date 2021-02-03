<template>
	<div ref="container" class="affix-container">
		<slot></slot>
	</div>
</template>

<script>
import Ui from 'vio/Ui';

export default {
	name: "AffixBottom",
	setup(props) {
		return {}
	},
	mounted() {
		Ui.affixBottom(this.$refs.container, '#page-content');
	},
}
</script>

<style scoped>
.affix-container {
	background: #fff;
}
</style>