<template>
	<a
	  @click.prevent="handler"
	  href="#"
	  class="dropdown-item"
	>
		<slot>Action</slot>
	</a>
</template>

<script>
import {ref, toRefs} from 'vue';

export default {
	name: "DropdownAction",
	props: {
		handler: Function
	},
	setup(props) {

		return {
		}
	},
	computed: {
	},
	mounted() {
	}
}
</script>

<style scoped>

</style>