<template>
  <ul class="nav nav-tabs mb-3" role="tablist">
    <li
      v-for="tab in tabs"
      :key="tab.slug"
      class="nav-item"
      role="presentation"
    >
      <a
        @click.prevent="select(tab.slug)"
        :href="`#${tab.slug}`"
        :id="`tab-${tab.slug}`"
        :class="{ active: isSelected(tab.slug) }"
        class="nav-link"
        data-toggle="tab"
        role="tab"
        aria-controls="home"
        aria-selected="true"
      >
        {{ tab.label }}
      </a>
    </li>
  </ul>

  <div class="tab-content">
    <template v-for="tab in tabs" :key="tab.slug">
      <tab-pane
        :aria-labelledby="`tab-${tab.slug}`"
        :class="{ 'show active': isSelected(tab.slug) }"
      >
        <component :is="tab.slot"></component>
      </tab-pane>
    </template>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import TabPane from "./TabPane";

export default {
  name: "TabGroup",
  components: {
    TabPane,
  },
  emits: [],
  props: {
    active: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const activeTab = ref(props.active);

    return {
      activeTab,
    };
  },
  mounted() {
    //console.log("Slots", this.$slots);
  },
  computed: {
    tabs() {
      let tabs = [];

      _.forEach(this.$slots, (slot, key) => {
        tabs.push({
          label: _.startCase(key),
          slug: _.kebabCase(key),
          slot: slot,
        });
      });

      return tabs;
    },
  },
  methods: {
    select(slug) {
      this.activeTab = slug;
    },
    isSelected(slug) {
      return this.activeTab == slug;
    },
  },
};
</script>

<style scoped>
</style>
