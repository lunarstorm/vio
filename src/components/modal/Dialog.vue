<template>
	<div
	  ref="modal"
	  class="modal"
	>
		<div
		  class="modal-dialog"
		  :class="classes"
		>
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">{{ title || '' }}</h5>
				</div>
				<div class="modal-body">
					<div v-html="message"></div>
				</div>
				<div class="modal-footer">
					<button
					  @click.prevent="doYes"
					  type="button" class="btn btn-primary"
					>
						{{ yesLabel }}
					</button>
					<button
					  @click.prevent="close"
					  type="button" class="btn btn-light"
					>
						{{ noLabel }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Dialog",
	props: {
		title: String,
		message: String,
		level: {
			type: String,
			default: 'info'
		},
		yesLabel: {
			type: String,
			default: 'Yes'
		},
		noLabel: {
			type: String,
			default: 'Cancel'
		},
		onYes: {
			type: Function,
			default: () => {
				return false;
			}
		},
		center: Boolean
	},
	mounted() {
		let $modal = $(this.$refs.modal);
		$modal.modal();
	},
	computed: {
		classes(){
			let items = [];

			if(this.center){
				items.push('modal-dialog-centered');
			}
			//items.push()

			return items;
		}
	},
	methods: {
		doYes(){
			if(this.onYes){
				this.onYes();
			}
			this.close();
		},
		close(){
			let $modal = $(this.$refs.modal);
			$modal.modal('hide');
		}
	}
}
</script>

<style scoped>

</style>