<template>
	<div
	  :id="id"
	  ref="modal"
	  class="modal vio-modal"
	>
		<div
		  :class="classes"
		  class="modal-dialog modal-dialog-scrollable"
		>
			<div class="modal-content">
				<div class="modal-header p-3">
					<h5 class="modal-title">
						<slot name="title">&nbsp;</slot>
					</h5>
					<button
					  ref="closeButton"
					  type="button"
					  class="close"
					  data-dismiss="modal"
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
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import {ref, toRefs} from 'vue';

export default {
	name: "Modal",
	props: {
		data: Object,
		size: {
			type: String,
			default: 'xl'
		},
	},
	setup(props) {
		let propRefs = toRefs(props);

		return {
			id: ref(''),
			token: '',
			size: props.size || 'lg',
			data: propRefs.data,
		};
	},
	mounted() {
		this.init();

		console.log('modal mounted!');

		$(this.$refs.modal).on('hide.bs.modal', event => {
			this.close();
		});
	},
	beforeUnmount() {
		$(this.$refs.modal).modal('hide');
		$(this.$refs.modal).modal('dispose');
	},
	unmounted() {
		this.dispose();
	},
	computed: {
		isUrl() {
			return !!this.data.url;
		},
		classes() {
			let classes = [];

			if (this.size) {
				classes.push('modal-' + this.size);
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
		dispose: function () {
		},
		close: function () {
			this.$emit('closed');
			this.dispose();
			return false;
		}
	}
}
</script>