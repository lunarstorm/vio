<template>
	<div ref="container" class="container">
		<slot></slot>
	</div>
</template>

<script>
import {ref} from 'vue';
import Ui from 'io/v/Ui';

export default {
	name: "AffixBottom",
	setup(props) {
		return {}
	},
	mounted() {
		//console.log('AffixBottom');
		Ui.affixBottom(this.$refs.container, '#page-content');
	},
}
</script>

<style scoped>
.container {
	background: #fff;
}
</style>