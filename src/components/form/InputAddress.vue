<template>
	<div>
		<div class="form-group">
			<label>Address</label>
			<input
			  v-model="line1"
			  @input="$emit('update:line1', $event.target.value)"
			  type="text"
			  class="form-control"
			/>
		</div>

		<div class="form-group">
			<label>Address (Line 2)</label>
			<input
			  v-model="line2"
			  @input="$emit('update:line2', $event.target.value)"
			  type="text"
			  class="form-control"
			/>
		</div>

		<div class="row">
			<div class="col-md-4">
				<div class="form-group">
					<label>City</label>
					<input
					  v-model="city"
					  @input="$emit('update:city', $event.target.value)"
					  type="text"
					  class="form-control"
					/>
				</div>
			</div>
			<div class="col-md-4">
				<div class="form-group">
					<label>Province/State</label>
					<input
					  v-model="province"
					  @input="$emit('update:province', $event.target.value)"
					  type="text"
					  class="form-control"
					/>
				</div>
			</div>
			<div class="col-md-4">
				<div class="form-group">
					<label>Postal Code</label>
					<input
					  v-model="postal"
					  @input="$emit('update:postal', $event.target.value)"
					  type="text"
					  class="form-control"
					/>
				</div>
			</div>
		</div>

		<div class="form-group">
			<label>Country</label>
			<input
			  v-model="country"
			  @change="$emit('update:country', $event.target.value)"
			  type="text"
			  class="form-control"
			/>
		</div>
	</div>
</template>

<script>
import {toRefs} from 'vue';
import InputText from "vio/components/form/InputText";

export default {
	name: "InputAddress",
	components: {
		InputText
	},
	props: {
		line1: String,
		line2: String,
		city: String,
		province: String,
		postal: String,
		zip: String,
		country: String,
		options: {
			type: Object,
			default: {}
		}
	},
	emits: [
		'update:line1',
		'update:line2',
		'update:city',
		'update:province',
		'update:postal',
		'update:country',
	],
	setup(props) {
		let propRefs = toRefs(props);
		let FP = null;

		return {
			options: propRefs.options,
			FP
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