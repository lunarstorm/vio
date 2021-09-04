<template>
  <table class="table">
    <thead v-if="!!$slots.head">
      <tr>
        <th></th>
        <slot name="head" :items="modelValue"></slot>
        <th width="30"></th>
      </tr>
    </thead>
    <vue-draggable
      :list="modelValue"
      itemKey="_uuid"
      :group="group"
      tag="tbody"
      handle=".handle"
    >
      <template #item="{ element: item, index }">
        <tr>
          <td class="handle text-center px-0">
            <i class="bi-grip-vertical text-muted"></i>
          </td>
          <slot
            name="row"
            :item="item"
            :index="index"
            :items="modelValue"
          ></slot>
          <td width="10" class="text-right">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-light px-1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="bi bi-three-dots"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                <a
                  @click.prevent="removeItemAtIndex(index)"
                  href="#"
                  class="dropdown-item"
                >
                  <i class="fa fa-times text-danger"></i> Remove
                </a>
              </div>
            </div>
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
import { v4 as uuidv4 } from "uuid";

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
  mounted() {
    this.addKeys();
  },
  computed() {},
  methods: {
    addKeys() {
      _.forEach(this.modelValue, (item, index) => {
        if (!item._sortable_key) {
          item._uuid = uuidv4();
        }
      });
    },
    addItem() {
      let itemToAdd = Object.assign(
        {
          _uuid: uuidv4(),
        },
        this.itemDef
      );
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

table td.handle {
  width: 15px !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
