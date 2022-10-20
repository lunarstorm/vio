<template>
  <teleport to="#externals">
    <div id="ix-modals">
      <div v-if="data.items.length > 0" class="io-modal-mask" />
      <div ref="modals">
        <Modal
          v-for="(item, index) in data.items"
          :key="index"
          :data="item"
          :index="index"
          v-bind="item.props"
          @closed="removeItem(index)"
        />
      </div>
    </div>
  </teleport>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import Ui from 'vio/Ui';
import Modal from './Modal.vue';
import {provide, reactive, ref, unref, watch} from 'vue';
import Url from 'url-parse';

var $body = $('body');
var $main = $('.io-viewport').first();
var $mask = $('<div class="io-modal-mask"></div>');
var scrollPosition = null;

if ($main.length == 0) {
    $main = $body;
}

var scales = {
    sm: {
        p: 0.5,
    },
    md: {
        p: 0.7,
    },
    lg: {
        p: 1,
    },
};

export default {
    name: 'Modals',
    components: {
        Modal,
    },
    provide() {
        return {
            scales: scales,
            parent: this,
            modals: this.data.items,
        };
    },
    setup() {
        const data = reactive({
            items: [],
        });

        provide('modals', data.items);
        provide('data', data);

        watch(data.items, (items) => {
            if (items.length === 0) {
                setTimeout(() => {
                    Ui.unlockScroll();
                }, 0);
            }
        });

        return {
            data,
        };
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

                //console.log(componentName, url);

                let args = {
                    params: url.query, // for backwards compatibility
                    ...url.query,
                };

                _this.loadComponent(componentName, args);
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

            console.log('Let\'s load a component', name, data, props);

            modals.push({
                props: {
                    component: {
                        name: name,
                        props: data,
                    },
                    ...props,
                },
            });
        },
        loadUrl: function (url) {
            var modals = this.data.items;
            modals.push({
                url: url,
            });
        },
    },
    computed: {
        isOpen() {
            return this.nItems > 0;
        },
        nItems() {
            return this.data.items.length;
        },
    },
};
</script>

<style type="text/css">
.io-modal {
	position: fixed;
	margin: 0 auto;
	width: 400px;
	border: 1px solid #ddd;
	z-index: 9000;
	background: #fcfcfc;
	box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
}

.io-modal .modal-hidden {
	display: none;
}

.io-modal-mask {
	z-index: 8999;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #000;
	opacity: 0.5;
	filter: alpha(opacity=50);
}

.io-modal .io-modal-content {
	display: block;
	padding: 10px;
	overflow-y: auto;
}

.io-modal .block hr {
	margin: 20px -10px;
}

.io-modal-toolbar {
	padding: 5px;
	background: #efefef;
}

.io-modal .io-modal-content .content-header {
	border-top: none;
	margin-bottom: 20px;
	margin-left: -10px;
	margin-top: -10px;
}

.io-modal .block {
	border: 1px solid #eee;
}

.io-modal ul.breadcrumb {
	display: none;
}

.io-modal .selectize-dropdown {
	z-index: 9000;
}

.modal,
.modal-dialog,
.bootstrap-dialog {
	z-index: 9100 !important;
}

.modal-backdrop {
	z-index: 1020 !important;
}
</style>