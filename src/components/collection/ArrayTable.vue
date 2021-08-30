<template>
  <table class="table">
    <thead v-if="!!$slots.head">
      <tr>
        <th width="25"></th>
        <slot name="head" :items="items"></slot>
        <th width="30"></th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in items" :key="index">
        <tr>
          <td width="25">-</td>
          <slot name="row" :item="item" :index="index" :items="items"></slot>
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
    </tbody>
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

export default {
  name: "ArrayTable",
  props: {
    items: {
      type: Array,
      default: [],
    },
    itemDef: {
      type: Object,
      default: {},
    },
  },
  components: {},
  setup(props) {
    return {};
  },
  mounted() {},
  methods: {
    addItem() {
      let itemToAdd = Object.assign({}, this.itemDef);
      this.items.push(itemToAdd);
    },
    removeItemAtIndex(index) {
      this.items.splice(index, 1);
    },
  },
};
</script>

<style scoped>
</style>
