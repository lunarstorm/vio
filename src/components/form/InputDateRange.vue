<template>
	<input-group class="input-group input-group-alt">
		<input-date
		  v-model="from"
		  @change="$emit('update:from', $event.target.value)"
		  placeholder="Start Date"
		></input-date>
		<div class="input-group-prepend input-group-append">
			<div class="input-group-text">
				<slot>to</slot>
			</div>
		</div>
		<input-date
		  v-model="to"
		  @change="$emit('update:to', $event.target.value)"
		  placeholder="End Date"
		></input-date>
	</input-group>
</template>

<script>
import {toRefs} from 'vue';
import InputGroup from "./InputGroup";
import InputDate from "vio/components/form/InputDate";

export default {
	name: "InputDateRange",
	components: {
		InputGroup,
		InputDate
	},
	props: {
		from: [String, Object],
		to: [String, Object],
		options: {
			type: Object,
			default: {}
		}
	},
	emits: [
		'update:from',
		'update:to'
	],
	setup(props) {
		let propRefs = toRefs(props);

		return {
			options: propRefs.options,
		};
	},
	computed: {},
	methods: {},
	created() {
	},
	mounted() {
	},
	updated() {
	},
	unmounted() {
	}
}
</script>

<style scoped>

</style>