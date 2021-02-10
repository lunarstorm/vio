<template>
	<div class="io-modal" :id="id">
		<div class="io-modal-toolbar clearfix">
			<a class="btn btn-primary btn-sm" href="#" @click="close" v-if="modals.length > 1">
				<i class="fa fa-chevron-left"></i>
			</a>
			<a class="btn btn-default btn-sm float-right pull-right" href="#" @click="close" ref="closeButton">
				<i class="fa fa-times"></i>
			</a>
		</div>
		<div class="io-modal-content" ref="modalContent">
			<div v-if="isUrl">
				<div ref="urlContent"></div>
			</div>
			<div v-else>
				<component :is="componentLoaded" v-bind="componentParams"></component>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import App from 'App';
import {unref, defineAsyncComponent, h} from 'vue';

var $body = $('body');
var $main = $('.io-viewport').first();

var loaded = {};

export default {
	name: "Modal",
	props: {
		data: Object
	},
	inject: ['util', 'scales', 'parent', 'modals'],
	data: function () {
		return {
			id: null,
			token: '',
			size: 'lg',
			visible: false,
			url: null,
			componentLoaded: null,
			componentParams: {}
		};
	},
	mounted() {
		this.init();
	},
	unmounted() {
		this.dispose();
	},
	computed: {
		isUrl() {
			return !!this.data.url;
		}
	},
	methods: {
		init: function () {
			this.id = _.uniqueId('modal-');
			this.token = Date.now();

			//this.util.freezeBody();

			window.addEventListener('resize', this.resize);

			if (this.data.url) {
				this.loadUrl(this.data.url);
			} else {
				if (this.data.component) {
					this.loadComponent(this.data.component, this.data.data);
				}
			}
		},
		dispose: function () {
			window.removeEventListener('resize', this.resize);
		},
		close: function () {
			this.dispose();
			this.$emit('closed');
			return false;
		},
		loadComponent: function (name, data) {
			var componentName = `injected-modal-component-${name}`;

			if (!loaded[componentName]) {
				App.vue.component(componentName, defineAsyncComponent(
				  () => import(`components/app/${name}.vue`)
				));
			}

			loaded[componentName] = true;
			this.componentLoaded = componentName;
			this.componentParams = {
				params: data,
				...data,
			};

			this.resize();
		},
		loadUrl(url) {
			let self = this;
			let target = this.$refs.urlContent;
			$(target).load(url, function (content) {
				self.resize();
			});
		},
		resize: _.throttle(function () {
			var $modalContainer = $(this.$el);
			var $modalBody = $(this.$refs.modalContent);

			//console.log('Resize', this.token, this.id);

			var W = $main.width();
			var H = window.innerHeight
			  || document.documentElement.clientHeight
			  || document.body.clientHeight;

			var windowW = window.innerWidth
			  || document.documentElement.clientWidth
			  || document.body.clientWidth;

			var gutter = 50;
			var offset = $main.offset();
			var size = this.size;

			if (W < 900) {
				// Force full-size when window is sufficiently small
				size = 'lg';
				gutter = 20;
			}

			if (W < 600) {
				offset.left = 0;
				W = $body.width();
			}

			if (W < 450) {
				gutter = 10;
			}

			var scale = this.scales[size];

			var modalW = Math.floor(scale.p * W) - gutter;

			if (H > 680) {
				var modalH = Math.floor(scale.p * H) - gutter;
			} else {
				var modalH = Math.floor(H - gutter);
			}

			$modalContainer.css({
				width: modalW,
				height: modalH,
				top: 0 + (gutter / 2),
				left: offset.left + Math.floor((W - modalW) / 2),
				marginBottom: '50px'
			});

			var containerHeight = $modalContainer.height() - 50;
			$modalBody.css({
				overflowX: 'hidden'
			});
			if (!$modalBody.hasClass('locked')) {
				$modalBody.outerHeight(containerHeight);
			}

			return false;
		}, 100)
	}
}
</script>