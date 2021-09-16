<template>
  <div class="btn-group">
    <button
      v-bind="$attrs"
      type="button"
      class="btn dropdown-toggle"
      data-toggle="dropdown"
    >
      <slot>Actions</slot>
    </button>
    <div :class="cssDropdownMenu" class="dropdown-menu" role="menu">
      <dropdown-items :items="items"></dropdown-items>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import DropdownItems from "./DropdownItems.vue";

export default {
  name: "ButtonMenu",
  inheritAttrs: false,
  props: {
    items: {
      type: Array,
      default: [],
    },
    align: {
      type: String,
      default: "left",
    },
  },
  components: {
    DropdownItems,
  },
  setup(props) {
    return {
      items: toRefs(props).items,
      align: props.align,
    };
  },
  computed: {
    cssDropdownMenu() {
      let classes = [];

      if (this.align == "right") {
        classes.push("dropdown-menu-right");
      }

      return classes;
    },
  },
  mounted() {},
};
</script>

<style scoped>
</style>
