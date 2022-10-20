<template>
  <table class="table">
    <thead v-if="!!$slots.head">
      <tr>
        <slot name="head" :items="items" />
        <th width="10" />
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in items" :key="index">
        <tr>
          <slot
            name="row"
            :item="item"
            :index="index"
            :items="items"
          />
          <td width="10" class="text-right">
            <DotMenu>
              <template #items>
                <a
                  href="#"
                  class="dropdown-item"
                  @click.prevent="removeItemAtIndex(index)"
                >
                  <i class="fa fa-times" /> Remove
                </a>
              </template>
            </DotMenu>
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="100" class="text-center">
          <a href="#" class="btn btn-sm btn-secondary" @click.prevent="addItem">
            <slot name="add-button">
              <i class="fa fa-plus-circle" /> Add
            </slot>
          </a>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import _ from 'lodash';
import DotMenu from 'vio/components/menu/DotMenu.vue';

export default {
    name: 'ArrayTable',
    components: {
        DotMenu,
    },
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
