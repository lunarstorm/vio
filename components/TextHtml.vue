<template>
	<div v-html="textHtml"></div>
</template>

<script>
import {ref, toRefs} from 'vue';

export default {
	name: "TextHtml",
	props: {
		text: String
	},
	setup(props) {
		return {
			text: toRefs(props).text
		}
	},
	methods: {
		nl2br(text){
			return text ? text.replace(/\n/g, '<br />') : '';
		}
	},
	computed: {
		textHtml() {
			return this.nl2br(this.text);
		}
	}
}
</script>

<style scoped>

</style>