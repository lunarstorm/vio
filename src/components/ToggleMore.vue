<template>
	<div>
		<div
		  class="d-flex align-items-center"
		  v-bind="$attrs"
		>
			<div>
				<a
				  v-if="enabled"
				  @click.prevent="toggle"
				  href="#"
				>
					<i
					  :class="{'fa-rotate-90':expanded}"
					  class="fa fa-caret-right mr-1"
					></i>
					<slot name="title"></slot>
				</a>
				<strong v-else class="text-muted">
					<i class="fa fa-caret-right mr-1"></i>
					<slot name="title"></slot>
				</strong>
			</div>
			<div class="ml-1 flex-grow-1">
				<slot name="extra"></slot>
			</div>
		</div>
		<div v-if="expanded" class="mt-1">
			<slot name="more"></slot>
		</div>
	</div>
</template>

<script>
import {ref} from 'vue';

export default {
	name: "ToggleMore",
	inheritAttrs: false,
	props: {
		expanded: {
			type: Boolean,
			default: false
		},
		disable: {
			type: Boolean,
			default: false
		},
	},
	setup(props) {
		return {
			expanded: ref(props.expanded),
			disabled: ref(props.disable)
		}
	},
	methods: {
		toggle() {
			this.expanded = !this.expanded;
			return false;
		}
	},
	computed: {
		enabled() {
			return !this.disabled;
		}
	}
}
</script>

<style scoped>

</style>