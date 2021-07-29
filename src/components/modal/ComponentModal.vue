<template>
	<modal
	  @disposed="dispose"
	>
		<template #default>
			<component
			  :is="component"
			  v-bind="props"
			></component>
		</template>
	</modal>
</template>

<script>
import Modal from "vio/components/modal/Modal";

export default {
	name: "ComponentModal",
	inheritAttrs: false,
	components: {
		Modal
	},
	props: {
		component: Object,
		props: Object,
		onDispose: Function
	},
	emits: ['dispose'],
	setup(){
	},
	mounted() {
	},
	methods: {
		dispose(){
			this.$emit('dispose');
		}
	}
}
</script>

<style scoped>

</style>