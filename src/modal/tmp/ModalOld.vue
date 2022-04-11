<template>
  <div :id="id" class="io-modal">
    <div class="io-modal-toolbar clearfix">
      <a
        v-if="modals.length > 1"
        class="btn btn-primary btn-sm"
        href="#"
        @click="close"
      >
        <i class="fa fa-chevron-left" />
      </a>
      <a
        ref="closeButton"
        class="btn btn-secondary btn-sm float-right pull-right"
        href="#"
        @click="close"
      >
        <i class="fa fa-times" />
      </a>
    </div>
    <div ref="modalContent" class="io-modal-content">
      <div v-if="isUrl">
        <div ref="urlContent" />
      </div>
      <div v-else>
        <component
          :is="getComponentDef(component.name)"
          v-if="component.name"
          v-bind="component.props"
          :params="component.props"
        />
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import Ui from 'vio/Ui';
import {defineAsyncComponent, reactive, toRefs} from 'vue';

var $body = $('body');
var $main = $('.io-viewport').first();

var loaded = {};

export default {
    name: 'Modal',
    inject: ['scales', 'parent', 'modals'],
    props: {
        data: Object,
        size: [String],
        url: {
            type: String,
            default: '',
        },
        component: {
            type: Object,
            default: null,
        },
    },
    setup(props) {
        let propRefs = toRefs(props);

        console.log('Hey, a new modal arrived', props.component);

        let component = reactive({
            name: null,
            props: {},
            ...props.component,
        });

        console.log('component', component);

        return {
            id: null,
            token: '',
            size: props.size || 'lg',
            url: propRefs.url,
            data: propRefs.data,
            component,
        };
    },
    computed: {
        isUrl() {
            return !!this.data.url;
        },
    },
    mounted() {
        this.init();
    },
    unmounted() {
        this.dispose();
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
                marginBottom: '50px',
            });

            var containerHeight = $modalContainer.height() - 50;
            $modalBody.css({
                overflowX: 'hidden',
            });
            if (!$modalBody.hasClass('locked')) {
                $modalBody.outerHeight(containerHeight);
            }

            return false;
        }, 100),
    },
};
</script>