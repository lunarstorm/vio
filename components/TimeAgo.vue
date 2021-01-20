<template>
	<time>{{ timeAgo }}</time>
</template>

<script>
import {ref, toRefs} from 'vue';
import {format} from 'timeago.js';

export default {
	name: "TimeAgo",
	props: {
		dateString: String
	},
	setup(props) {
		return {
			value: toRefs(props).dateString,
		}
	},
	methods: {},
	computed: {
		date() {
			return Date.parse(this.value);
		},
		timeAgo() {
			return format(this.date);
		}
	}
}
</script>

<style scoped>

</style>