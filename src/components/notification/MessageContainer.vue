<template>
	<div aria-live="polite" aria-atomic="true">
		<div style="position: fixed; top: 4.5rem; right: 1rem; z-index: 1050">
			<template
			  v-for="(item, index) in items"
			  :key="index"
			>
				<toast-message :item="item"></toast-message>
			</template>
		</div>
	</div>
</template>

<script>
import ToastMessage from "vio/components/notification/Toast";
import {ref, watchEffect} from "vue";
import Messages from "vio/helpers/Messages";

export default {
	name: "MessageContainer",
	components: {
		ToastMessage
	},
	props: {
		messages: Array
	},
	setup(props) {
		const items = ref([]);

		return {
			Messages,
			items
		};
	},
	mounted() {
		watchEffect(() => {
			let limit = 0;
			while(Messages.hasItems()){
				this.items.push(Messages.pop());

				if(++limit >= 100){
					break;
				}
			}
		});
	},
	computed: {
		queue(){
		}
	}
}
</script>

<style scoped>

</style>