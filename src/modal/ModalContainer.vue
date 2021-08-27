<template>
	<teleport to="#externals">
		<div id="vio-modals" ref="modals">
			<modal v-for="(item, index) in data.items"
			  :data="item"
			  :index="index"
			  :key="index"
			  v-bind="item.props"
			  @closed="removeItem(index)"
			></modal>
		</div>
	</teleport>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import Modal from './Modal.vue';
import {defineAsyncComponent, provide, reactive, resolveComponent, watch} from 'vue';
import Url from 'url-parse';
import ModalHelper from 'vio/helpers/Modal';

var scrollPosition = null;

export default {
	name: "ModalContainer",
	components: {
		Modal
	},
	setup() {
		const data = reactive({
			items: []
		});

		provide('modals', data.items);
		provide('data', data);

		watch(data.items, (items) => {
			if (items.length === 0) {
				setTimeout(() => {
					//Ui.unlockScroll();
				}, 0);
			}
		});

		return {
			data
		}
	},
	provide() {
		return {
			parent: this,
			modals: this.data.items
		}
	},
	mounted() {
		this.init();
		window.$Modal = this;
	},
	methods: {
		init: _.once(function () {
			var _this = this;

			$(document).on('click', 'a[data-component-modal]', function (e) {
				e.preventDefault();
				var $this = $(this);
				var path = $this.attr('data-component-modal');
				var url = Url(`/${path}`, true);

				var componentName = url.pathname.replace(/^\/+/, '');

				let args = {
					params: url.query, // for backwards compatibility
					...url.query
				};

				let component = defineAsyncComponent(() => import(`components/app/${componentName}.vue`));
				ModalHelper.loadComponent(component, args);

				return false;
			});

			$(document).on('click', 'a[data-modal-href]', function (e) {
				e.preventDefault();
				var $this = $(this);
				var url = $this.attr('href');
				_this.loadUrl(url);
				return false;
			});
		}),
		closeAll: function () {
			this.data.items = [];
		},
		close: function () {
			this.data.items.pop();
		},
		removeItem(index) {
			this.data.items.splice(index, 1);
		},
		loadComponent: function (name, data, props) {
			let modals = this.data.items;

			//console.log("Let's load a component", name, data, props);

			if(data.params){
				data = {
					...data,
					...data.params
				}
			}

			modals.push({
				props: {
					component: {
						name: name,
						props: data,
					},
					...props
				}
			});
		},
		loadUrl: function (url) {
			var modals = this.data.items;
			modals.push({
				url: url,
			});
		}
	},
	computed: {
		isOpen() {
			return this.nItems > 0;
		},
		nItems() {
			return this.data.items.length;
		}
	}
}
</script>

<style type="text/css">

</style>