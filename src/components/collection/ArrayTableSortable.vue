<template>
  <div>
    <table class="table" v-bind="$attrs">
      <thead v-if="!!$slots.head" :class="headClass">
        <tr>
          <th width="10" />
          <th v-if="selectable" class="text-center px-0 align-middle">
            <a
              v-if="modelValue.length > 0"
              href="#"
              @click.prevent="toggleSelectAll"
            >
              <i
                v-if="isAllSelected()"
                class="bi-check-square-fill text-primary"
              />
              <i v-else class="bi-square text-muted" />
            </a>
          </th>
          <slot
            name="head"
            :items="modelValue"
            :selected-items="selected"
          />
          <th v-if="rowControls" width="30" />
        </tr>
      </thead>
      <VueDraggable
        :list="modelValue"
        :item-key="itemKey"
        :group="group"
        tag="tbody"
        handle=".handle"
      >
        <template #item="{ element: item, index }">
          <tr>
            <td class="handle text-center px-0">
              <i
                class="bi-grip-vertical text-muted"
                style="font-size: 1.5rem"
              />
            </td>
            <td v-if="selectable" class="text-center align-middle">
              <a href="#" @click.prevent="toggleSelect(item)">
                <i
                  v-if="isSelected(item)"
                  class="bi-check-square-fill text-primary"
                />
                <i v-else class="bi-square text-muted" />
              </a>
            </td>
            <slot
              name="row"
              :item="item"
              :index="index"
              :items="modelValue"
            />
            <td v-if="rowControls" width="10" class="text-right px-1">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-light p-1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="bi bi-three-dots-vertical" />
                </button>
                <div class="dropdown-menu dropdown-menu-right">
                  <slot
                    name="row-menu"
                    :item="item"
                    :index="index"
                    :items="modelValue"
                  >
                    <slot
                      name="row-dropdown"
                      :item="item"
                      :index="index"
                      :items="modelValue"
                    />
                    <a
                      href="#"
                      class="dropdown-item"
                      @click.prevent="copyItem(item)"
                    >
                      <i class="fa fa-copy" /> Copy
                    </a>
                    <a
                      href="#"
                      class="dropdown-item"
                      @click.prevent="removeItemAtIndex(index, item)"
                    >
                      <i class="fa fa-times text-danger" /> Remove
                    </a>
                  </slot>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </VueDraggable>
      <tfoot>
        <tr v-if="!!$slots.foot">
          <td />
          <slot name="foot" :items="modelValue" />
          <td />
        </tr>
        <tr>
          <td colspan="100">
            <slot name="bottom-bar">
              <div class="text-center">
                <a
                  href="#"
                  class="btn btn-sm btn-secondary"
                  @click.prevent="addItem"
                >
                  <slot name="add-button">
                    <i class="fa fa-plus-circle" /> Add
                  </slot>
                </a>
              </div>
            </slot>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { ref, watch, watchEffect } from 'vue';
import VueDraggable from 'vuedraggable';
import BatchSelector from 'vio/helpers/BatchSelector';

export default {
    name: 'ArrayTableSortable',
    components: {
        VueDraggable,
    },
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
            default: '_uuid',
        },
        group: {
            type: String,
            default: null,
        },
        headClass: {
            type: String,
            default: '',
        },
        selectable: {
            type: Boolean,
            default: false,
        },
        rowControls: {
            type: Boolean,
            default: true,
        },
    },
    emits: ['add-item', 'copy-item', 'remove-items', 'selection-change'],
    setup(props) {
        const batch = new BatchSelector();
        const selected = ref([]);

        return {
            batch,
            selected,
        };
    },
    computed: {
        selectedItems() {
            return this.selected;
        },
    },
    mounted() {
        this.addKeys();

        watch(
            () => this.selected.length,
            (length) => {
                this.$emit('selection-change', this.selected);
            },
        );

        watchEffect(() => {
            _.remove(this.selected, (item) => {
                return this.modelValue.indexOf(item) == -1;
            });
        });
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
                this.itemDef,
            );
            this.modelValue.push(itemToAdd);
            this.$emit('add-item', itemToAdd);
        },
        copyItem(item) {
            let copy = Object.assign({}, item, {
                _uuid: uuidv4(),
            });
            this.modelValue.push(copy);
            this.$emit('copy-item', copy);
        },
        removeItemAtIndex(index, item) {
            let removed = this.modelValue.splice(index, 1);
            this.unselectItem(item);
            this.$emit('remove-items', removed);
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
