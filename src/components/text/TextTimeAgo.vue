<template>
	<span :title="title">{{ timeAgo }}</span>
</template>

<script>
import {ref, toRefs} from 'vue';
import {format} from 'timeago.js';

export default {
	name: "TextTimeAgo",
	props: {
		value: String
	},
	setup(props) {
		return {
			value: toRefs(props).value,
		}
	},
	methods: {},
	computed: {
		date() {
			return Date.parse(this.value);
		},
		timeAgo() {
			return format(this.date);
		},
		title(){
			return this.value;
		}
	}
}
</script>

<style scoped>

</style>