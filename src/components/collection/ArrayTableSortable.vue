<template>
  <div>
    <table class="table" v-bind="$attrs">
      <thead v-if="!!$slots.head" :class="headClass">
        <tr>
          <th v-if="selectable" class="text-center px-0 align-middle">
            <a
              v-if="modelValue.length > 0"
              @click.prevent="toggleSelectAll"
              href="#"
            >
              <i
                v-if="isAllSelected()"
                class="bi-check-square-fill text-primary"
              ></i>
              <i v-else class="bi-square text-muted"></i>
            </a>
          </th>
          <th></th>
          <slot
            name="head"
            :items="modelValue"
            :selected-items="selected"
          ></slot>
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
            <td v-if="selectable" class="text-center align-middle">
              <a @click.prevent="toggleSelect(item)" href="#">
                <i
                  v-if="isSelected(item)"
                  class="bi-check-square-fill text-primary"
                ></i>
                <i v-else class="bi-square text-muted"></i>
              </a>
            </td>
            <td class="handle text-center px-0">
              <i
                class="bi-grip-vertical text-muted"
                style="font-size: 1.5rem"
              ></i>
            </td>
            <slot
              name="row"
              :item="item"
              :index="index"
              :items="modelValue"
            ></slot>
            <td width="10" class="text-right px-1">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-light p-1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <slot
                    name="row-dropdown"
                    :item="item"
                    :index="index"
                    :items="modelValue"
                  ></slot>
                  <a
                    @click.prevent="copyItem(item)"
                    href="#"
                    class="dropdown-item"
                  >
                    <i class="fa fa-copy"></i> Copy
                  </a>
                  <a
                    @click.prevent="removeItemAtIndex(index, item)"
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
        <tr v-if="!!$slots.foot">
          <td></td>
          <slot name="foot" :items="modelValue"></slot>
          <td></td>
        </tr>
        <tr>
          <td colspan="100" class="text-center">
            <a
              @click.prevent="addItem"
              href="#"
              class="btn btn-sm btn-secondary"
            >
              <slot name="add-button">
                <i class="fa fa-plus-circle"></i> Add
              </slot>
            </a>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import _ from "lodash";
import VueDraggable from "vuedraggable";
import { v4 as uuidv4 } from "uuid";
import { ref } from "@vue/reactivity";
import BatchSelector from "vio/helpers/BatchSelector";

export default {
  name: "ArrayTableSortable",
  inheritAttrs: false,
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
      default: "_uuid",
    },
    group: {
      type: String,
      default: null,
    },
    headClass: {
      type: String,
      default: "",
    },
    selectable: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    VueDraggable,
  },
  emits: ["add-item", "copy-item", "remove-items"],
  setup(props) {
    const batch = new BatchSelector();
    const selected = ref([]);

    return {
      batch,
      selected,
    };
  },
  mounted() {
    this.addKeys();
  },
  computed: {
    selectedItems() {
      return this.selected;
    },
  },
  methods: {
    addKeys() {
      _.forEach(this.modelValue, (item, index) => {
        if (!item._sortable_key && !item._uuid) {
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
      this.$emit("add-item", itemToAdd);
    },
    copyItem(item) {
      let copy = Object.assign({}, item, {
        _uuid: uuidv4(),
      });
      this.modelValue.push(copy);
      this.$emit("copy-item", copy);
    },
    removeItemAtIndex(index, item) {
      let removed = this.modelValue.splice(index, 1);
      this.unselectItem(item);
      this.$emit("remove-items", removed);
    },
    removeItem(itemToRemove) {
      _.remove(this.modelValue, (item) => {
        return itemToRemove._uuid == item._uuid;
      });

      this.unselectItem(itemToRemove);
    },
    removeItems(items) {
      let uuids = _.map(items, (item) => item._uuid);
      _.remove(this.modelValue, (item) => {
        let match = _.includes(uuids, item._uuid);
        if (match) {
          this.unselectItem(item);
        }
        return match;
      });
    },
    selectItem(item) {
      if (this.isSelected(item)) {
        return;
      }
      this.selected.push(item);
    },
    unselectItem(item) {
      _.remove(this.selected, (selectedItem) => {
        return item._uuid == selectedItem._uuid;
      });
    },
    isSelected(item) {
      let index = _.findIndex(this.selected, (selectedItem) => {
        return item._uuid == selectedItem._uuid;
      });

      return index > -1;
    },
    isAllSelected() {
      let N = this.modelValue.length;
      return N > 0 && this.selected.length >= N;
    },
    toggleSelectAll() {
      if (this.isAllSelected()) {
        return this.unselectAll();
      }

      return this.selectAll();
    },
    toggleSelect(item) {
      if (this.isSelected(item)) {
        this.unselectItem(item);
      } else {
        this.selectItem(item);
      }
    },
    unselectAll() {
      this.selected = [];
    },
    selectAll() {
      _.forEach(this.modelValue, (item) => {
        if (!this.isSelected(item)) {
          this.selectItem(item);
        }
      });
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

table td.narrow {
  width: 15px !important;
}
</style>
