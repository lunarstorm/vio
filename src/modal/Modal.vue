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
					<h5 class="modal-title">&nbsp;</h5>
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
						<div v-if="isUrl">
							<div ref="urlContent"></div>
						</div>
						<div v-else>
							<component
							  v-if="component.name"
							  :is="getComponentDef(component.name)"
							  v-bind="component.props"
							  :params="component.props"
							></component>
						</div>
					</div>
				</div>
				<div class="vio-modal-footer"></div>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import {defineAsyncComponent, reactive, ref, toRefs} from 'vue';

export default {
	name: "Modal",
	props: {
		data: Object,
		size: {
			type: String,
			default: 'xl'
		},
		url: {
			type: String,
			default: ''
		},
		component: {
			type: Object,
			default: null
		}
	},
	inject: ['parent', 'modals'],
	setup(props) {
		let propRefs = toRefs(props);

		let component = reactive({
			name: null,
			props: {},
			...props.component
		});

		return {
			id: ref(''),
			token: '',
			size: props.size || 'lg',
			url: propRefs.url,
			data: propRefs.data,
			component
		};
	},
	mounted() {
		this.init();

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

			if (this.data.url) {
				this.loadUrl(this.data.url);
			}
		},
		dispose: function () {
		},
		close: function () {
			this.$emit('closed');
			this.dispose();
			return false;
		},
		getComponentDef(name) {
			return defineAsyncComponent(() => import(`components/app/${name}.vue`));
		},
		loadComponent: function (name, data) {
			this.componentLoaded = this.getComponentDef(name);

			this.componentParams = {
				params: data,
				...data,
			};
		},
		loadUrl(url) {
			let self = this;
			let target = this.$refs.urlContent;
			$(target).load(url, function (content) {
			});
		},
	}
}
</script>