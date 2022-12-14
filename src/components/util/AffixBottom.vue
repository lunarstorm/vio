<template>
  <div ref="container">
    <template v-if="teleportTo">
      <teleport ref="teleported" :to="teleportTo" :disabled="!teleportTo">
        <div class="modal-footer">
          <div class="w-100">
            <slot />
          </div>
        </div>
      </teleport>
    </template>
    <div v-else>
      <div class="affix-container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Ui from 'vio/Ui';
import { ref } from 'vue';
import _ from 'lodash';
import Modal from 'vio/helpers/Modal';

export default {
    name: 'AffixBottom',
    props: {
        parent: {
            type: [String, Object],
            default: '#page-content',
        },
    },
    setup(props) {
        return {
            teleportTo: ref(false),
            listener: null,
        };
    },
    computed: {},
    mounted() {
        let affixTo = this.parent;

        this.$nextTick(() => {
            if (this.inModal()) {
                affixTo = this.findModalContainer();
                this.teleportTo = this.findModalFooter();

                this.$nextTick(() => {
                    this.handleFormElements();
                });
            } else {
                this.listener = Ui.affixBottom(this.$refs.container, affixTo);
            }
        });
    },
    unmounted() {
        if (this.listener) {
            this.listener.dispose();
        }
    },
    methods: {
        inModal() {
            return Modal.isOpen();
        },
        findModalFooter() {
            let $container = $(this.$refs.container);

            // Find the closest modal
            let $modal = $container.closest('.vio-modal');

            return $modal.find('.vio-modal-footer')[0];
        },
        findModalContainer() {
            let $container = $(this.$refs.container);
            let $modal = $container.closest('.vio-modal');
            return $modal.find('.vio-modal-parent')[0];
        },
        handleFormElements() {
            let $container = $(this.$refs.container);
            let $modal = $container.closest('.vio-modal');
            let $form = $container.closest('form');

            if ($form.length > 0) {
                let formId = $form.attr('id');

                if (!formId) {
                    formId = _.uniqueId('form');
                    $form.attr('id', formId);
                }

                if ($modal) {
                    let $submit = $modal.find('*[type=submit]');
                    $submit.attr('form', formId);
                }
            }
        },
    },
};
</script>

<style scoped>
.affix-container {
  background: #fff;
  position: relative;
}
</style>
