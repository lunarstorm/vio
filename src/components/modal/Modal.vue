<template>
  <teleport to="body">
    <component :is="form ? 'form' : 'div'" @submit.prevent="submit">
      <div ref="modal" class="modal vio-modal" v-bind="attrs">
        <div class="modal-dialog" :class="classes">
          <div class="modal-content">
            <div class="modal-header p-3">
              <h5 class="modal-title">
                <slot name="title" :close="close">
                  {{ title }}&nbsp;
                </slot>
              </h5>
              <button
                ref="closeButton"
                type="button"
                class="close"
                aria-label="Close"
                @click.prevent="close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body p-2 vio-modal-parent">
              <div ref="modalContent" class="container-fluid vio-modal-content">
                <slot name="default" :close="close" />
              </div>
            </div>
            <div v-if="!!$slots.footer" class="modal-footer vio-modal-footer">
              <slot name="footer" :close="close" />
            </div>
            <div v-else class="vio-modal-footer" />
          </div>
        </div>
      </div>
    </component>
  </teleport>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import { ref, toRefs } from 'vue';

export default {
    name: 'Modal',
    inheritAttrs: false,
    props: {
        toggledBy: Boolean,
        title: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: 'xl',
        },
        center: Boolean,
        static: Boolean,
        scroll: {
            type: Boolean,
            default: true,
        },
        form: Boolean,
        formSubmit: Function,
    },
    emits: ['closed', 'hidden', 'disposed'],
    setup(props) {
        let propRefs = toRefs(props);
        const wasClosed = ref(false);
        window._modalCount = window._modalCount || 0;

        return {
            id: ref(''),
            token: '',
            size: props.size || 'lg',
            data: propRefs.data,
            wasClosed,
        };
    },
    computed: {
        attrs() {
            let attrs = {};

            if (this.static) {
                attrs['data-backdrop'] = 'static';
            }

            return {
                ...this.$attrs,
                ...attrs,
            };
        },
        classes() {
            let classes = [];

            if (this.size) {
                classes.push('modal-' + this.size);
            }

            if (this.center) {
                classes.push('modal-dialog-centered');
            }

            if (this.scroll) {
                classes.push('modal-dialog-scrollable');
            }

            return classes;
        },
    },
    created() {},
    mounted() {
        window._modalCount++;

        this.$nextTick(() => {
            this.init();
        });
    },
    beforeUnmount() {
        if (!this.wasClosed) {
            this.close();
        }

        window._modalCount--;
    },
    unmounted() {},
    methods: {
        init: function () {
            this.id = _.uniqueId('modal-');
            this.token = Date.now();

            $(this.$refs.modal).modal('show');

            $(this.$refs.modal).on('hide.bs.modal', () => {
                if (!this.wasClosed) {
                    this.close();
                }
            });
        },
        toggle() {
            this.toggledBy = !this.toggledBy;
        },
        dispose: function () {
            $(this.$refs.modal).modal('dispose');
            this.$emit('disposed');
        },
        close: function () {
            this.wasClosed = true;
            $(this.$refs.modal).modal('hide');
            this.$emit('closed');
            this.dispose();
        },
        submit() {
            if (this.formSubmit) {
                return this.formSubmit();
            }
        },
    },
};
</script>

<style>
.modal-backdrop {
  z-index: 1030 !important;
}
</style>
