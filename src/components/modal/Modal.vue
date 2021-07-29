<template>
	<teleport to="body">
		<component
		  :is="form ? 'form' : 'div'"
		  @submit.prevent="submit"
		>
			<div
			  ref="modal"
			  class="modal vio-modal"
			  v-bind="$attrs"
			>
				<div
				  class="modal-dialog modal-dialog-scrollable"
				  :class="classes"
				>
					<div class="modal-content">
						<div class="modal-header p-3">
							<h5 class="modal-title">
								<slot name="title">&nbsp;</slot>
							</h5>
							<button
							  @click.prevent="close"
							  ref="closeButton"
							  type="button"
							  class="close"
							  aria-label="Close"
							>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body p-2 vio-modal-parent">
							<div
							  class="container-fluid vio-modal-content"
							  ref="modalContent"
							>
								<slot name="default"></slot>
							</div>
						</div>
						<div v-if="!!$slots.footer" class="modal-footer vio-modal-footer">
							<slot
							  name="footer"
							  :close="close"
							></slot>
						</div>
					</div>
				</div>
			</div>
		</component>
	</teleport>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import {ref, toRefs} from 'vue';

export default {
	name: "Modal",
	inheritAttrs: false,
	props: {
		toggledBy: Boolean,
		size: {
			type: String,
			default: 'xl'
		},
		center: Boolean,
		form: Boolean,
		formSubmit: Function
	},
	emits: [
		'closed',
		'hidden',
		'disposed'
	],
	setup(props) {
		let propRefs = toRefs(props);

		return {
			id: ref(''),
			token: '',
			size: props.size || 'lg',
			data: propRefs.data,
		};
	},
	created() {
	},
	mounted() {
		this.init();
	},
	beforeUnmount() {
	},
	unmounted() {
	},
	computed: {
		classes() {
			let classes = [];

			if (this.size) {
				classes.push('modal-' + this.size);
			}

			if (this.center) {
				classes.push('modal-dialog-centered');
			}

			return classes;
		}
	},
	methods: {
		init: function () {
			this.id = _.uniqueId('modal-');
			this.token = Date.now();
			$(this.$refs.modal).modal('show');
		},
		toggle() {
			this.toggledBy = !this.toggledBy;
		},
		dispose: function () {
			$(this.$refs.modal).modal('dispose');
			this.$emit('disposed');
		},
		close: function () {
			$(this.$refs.modal).modal('hide');
			this.$emit('closed');
			this.dispose();
		},
		submit(){
			if(this.formSubmit){
				return this.formSubmit();
			}
		}
	}
}
</script>

<style>

</style>