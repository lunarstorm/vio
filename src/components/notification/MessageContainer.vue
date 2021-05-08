<template>
	<div aria-live="polite" aria-atomic="true">
		<div style="position: fixed; top: 4.5rem; right: 1rem; z-index: 1050">
			<template
			  v-for="(item, index) in items"
			  :key="index"
			>
				<toast :item="item"></toast>
			</template>
		</div>
	</div>
</template>

<script>
import Toast from "./Toast";
import {ref, watch, watchEffect} from "vue";
import Messages from "vio/helpers/Messages";

export default {
	name: "MessageContainer",
	components: {
		Toast
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