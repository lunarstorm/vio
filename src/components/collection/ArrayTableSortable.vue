<template>
  <table class="table">
    <thead v-if="!!$slots.head">
      <tr>
        <th width="15"></th>
        <slot name="head" :items="modelValue"></slot>
        <th width="30"></th>
      </tr>
    </thead>
    <vue-draggable
      :list="modelValue"
      :itemKey="itemKey"
      :group="group"
      tag="tbody"
      handle=".handle"
    >
      <template #item="{ element: item, index }">
        <tr>
          <td width="15" class="handle text-center">
            <i class="fa fa-bars text-muted"></i>
          </td>
          <slot
            name="row"
            :item="item"
            :index="index"
            :items="modelValue"
          ></slot>
          <td width="30" class="text-right">
            <a
              @click.prevent="removeItemAtIndex(index)"
              href="#"
              class="btn btn-secondary btn-icon"
            >
              <i class="fa fa-times"></i>
            </a>
          </td>
        </tr>
      </template>
    </vue-draggable>
    <tfoot>
      <tr>
        <td colspan="100" class="text-center">
          <a @click.prevent="addItem" href="#" class="btn btn-sm btn-secondary">
            <slot name="add-button">
              <i class="fa fa-plus-circle"></i> Add
            </slot>
          </a>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import _ from "lodash";
import VueDraggable from "vuedraggable";

export default {
  name: "ArrayTableSortable",
  props: {
    modelValue: {
      type: Array,
      default: [],
    },
    itemDef: {
      type: Object,
      default: {},
    },
    itemKey: {
      type: String,
      default: "id",
    },
    group: {
      type: String,
      default: null,
    },
  },
  components: {
    VueDraggable,
  },
  setup(props) {
    return {};
  },
  mounted() {},
  methods: {
    addItem() {
      let itemToAdd = Object.assign({}, this.itemDef);
      this.modelValue.push(itemToAdd);
    },
    removeItemAtIndex(index) {
      this.modelValue.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.handle {
  cursor: move;
  cursor: -webkit-grabbing;
}
</style>
