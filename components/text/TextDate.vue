<template>
	<span>{{ dateFormatted }}</span>
</template>

<script>
import {toRefs} from 'vue';
import {DateTime} from 'luxon';

const DATE_FORMAT = 'yyyy-MM-dd';

export default {
	name: "TextDate",
	props: {
		date: String,
		format: {
			type: String,
			default: DATE_FORMAT
		}
	},
	setup(props) {
		return {
			date: toRefs(props).date,
			format: toRefs(props).format
		}
	},
	methods: {

	},
	computed: {
		dateObject(){
			return DateTime.fromISO(this.date);
		},
		dateFormatted() {
			let dt = this.dateObject;
			return dt.toFormat(this.format);
		}
	}
}
</script>

<style scoped>

</style>