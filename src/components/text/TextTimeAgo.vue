<template>
	<span
	  v-if="dateISO"
	  ref="el"
	  :title="title"
	  :datetime="dateISO"
	></span>
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
			if (!this.value) {
				return null;
			}

			return Date.parse(this.value);
		},
		dateISO(){
			if(!this.timestamp){
				return null;
			}

			let date = new Date(this.timestamp);

			return date ? date.toISOString() : null;
		},
		timeAgo() {
			if (!this.timestamp) {
				return null;
			}

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