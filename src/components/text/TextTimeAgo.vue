<template>
	<span ref="el" :title="title" :datetime="dateISO"></span>
</template>

<script>
import {toRefs} from 'vue';
import {cancel, format, render} from 'timeago.js';

export default {
	name: "TextTimeAgo",
	props: {
		value: [String, Number]
	},
	setup(props) {
		return {
			value: toRefs(props).value,
		}
	},
	mounted(){
		this.render();
	},
	updated(){
		this.refresh();
	},
	methods: {
		render(){
			render(this.$refs.el);
		},
		refresh(){
			cancel(this.$refs.el);
			this.render();
		}
	},
	computed: {
		timestamp() {
			return Date.parse(this.value);
		},
		dateISO(){
			let date = new Date(this.timestamp);
			return date.toISOString();
		},
		timeAgo() {
			return format(this.timestamp);
		},
		title(){
			return this.value;
		}
	}
}
</script>

<style scoped>

</style>