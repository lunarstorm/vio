<template>
  <div v-if="items.length > 0" class="btn-group">
    <template v-if="firstItem">
      <a
        v-if="!!firstItem.href"
        :href="firstItem.href"
        :title="firstItem.text"
        :target="firstItem.target"
        class="btn btn-secondary"
      >
        <i :class="firstItem.icon" class="fa fa-fw" />
      </a>
      <a
        v-else
        :title="firstItem.text"
        href="#"
        class="btn btn-secondary"
        @click.prevent="firstItem.fn"
      >
        <i :class="firstItem.icon" class="fa fa-fw" />
      </a>
    </template>
    <button
      type="button"
      class="btn btn-secondary"
      data-toggle="dropdown"
      data-boundary="viewport"
    >
      <i class="fa fa-ellipsis-h" />
    </button>
    <div class="dropdown-menu dropdown-menu-right" role="menu">
      <dropdown-items :items="items" />
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from 'vue';
import DropdownItems from './DropdownItems.vue';

export default {
    name: 'EditMenu',
    components: {
        DropdownItems,
    },
    props: {
        items: {
            type: Array,
            default: [],
        },
    },
    setup(props) {
        return {
            items: toRefs(props).items,
        };
    },
    computed: {
        firstItem() {
            if (this.items.length > 0) {
                return this.items[0];
            }

            return null;
        },
    },
    mounted() {},
};
</script>

<style scoped>
</style>
