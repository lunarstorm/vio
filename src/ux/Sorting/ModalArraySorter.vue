<template>
  <Modal size="lg" :center="true" :scroll="false">
    <template #title>
      <slot name="title">
        Sort Items
      </slot>
    </template>
    <template #default>
      <table class="table">
        <VueDraggable
          :list="modelValue"
          :item-key="itemKey"
          :group="group"
          tag="tbody"
          handle=".handle"
        >
          <template #item="{ element: item, index }">
            <tr>
              <td width="15" class="handle text-center px-0 align-middle">
                <i
                  class="bi-grip-vertical text-muted"
                  style="font-size: 1.5rem"
                />
              </td>
              <td class="align-middle">
                <slot name="item" :item="item" :index="index" />
              </td>
            </tr>
          </template>
        </VueDraggable>
      </table>
    </template>
    <template #footer="{ close }">
      <button class="btn btn-primary" @click.prevent="close">
        Dismiss
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from 'vio/components/modal/Modal';
import VueDraggable from 'vuedraggable';

export default {
    name: 'ModalArraySorter',
    components: {
        Modal,
        VueDraggable,
    },
    props: {
        modelValue: [Array],
        itemKey: String,
        group: {
            type: String,
            default: () => {
                let timestamp = +new Date();
                return 'sort-group-' + timestamp;
            },
        },
    },
    emits: ['submit'],
    setup(props) {},
    methods: {},
};
</script>

<style>
.handle {
  cursor: move;
  cursor: -webkit-grabbing;
}
</style>
