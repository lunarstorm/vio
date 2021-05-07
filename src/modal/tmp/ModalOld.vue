<template>
	<div class="io-modal" :id="id">
		<div class="io-modal-toolbar clearfix">
			<a class="btn btn-primary btn-sm" href="#" @click="close" v-if="modals.length > 1">
				<i class="fa fa-chevron-left"></i>
			</a>
			<a class="btn btn-secondary btn-sm float-right pull-right" href="#" @click="close" ref="closeButton">
				<i class="fa fa-times"></i>
			</a>
		</div>
		<div class="io-modal-content" ref="modalContent">
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
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import Ui from "vio/Ui";
import {defineAsyncComponent, reactive, toRefs} from 'vue';

var $body = $('body');
var $main = $('.io-viewport').first();

var loaded = {};

export default {
	name: "Modal",
	props: {
		data: Object,
		size: [String],
		url: {
			type: String,
			default: ''
		},
		component: {
			type: Object,
			default: null
		}
	},
	inject: ['scales', 'parent', 'modals'],
	setup(props) {
		let propRefs = toRefs(props);

		console.log('Hey, a new modal arrived', props.component);

		let component = reactive({
			name: null,
			props: {},
			...props.component
		});

		console.log('component', component);

		return {
			id: null,
			token: '',
			size: props.size || 'lg',
			url: propRefs.url,
			data: propRefs.data,
			component
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

			Ui.lockScroll();

			window.addEventListener('resize', this.resize);

			if (this.data.url) {
				this.loadUrl(this.data.url);
			} else {

			}

			this.resize();
		},
		dispose: function () {
			window.removeEventListener('resize', this.resize);
		},
		close: function () {
			this.$emit('closed');
			this.dispose();
			return false;
		},
		getComponentDef(name) {
			return defineAsyncComponent(() => import(`components/app/${name}.vue`));
			//return require(`components/app/${name}.vue`);
		},
		loadComponent: function (name, data) {
			this.componentLoaded = this.getComponentDef(name);

			this.componentParams = {
				params: data,
				...data,
			};

			console.log('loadComponent', this.componentLoaded);

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
			let modalH = Math.floor(scale.p * H) - gutter;

			if (modalH < 750) {
				modalH = Math.floor(H - gutter);
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