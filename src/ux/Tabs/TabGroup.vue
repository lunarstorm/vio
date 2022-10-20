<template>
  <ul class="nav nav-tabs mb-3" role="tablist">
    <li
      v-for="tab in tabs"
      :key="tab.slug"
      class="nav-item"
      role="presentation"
    >
      <a
        :id="`tab-${tab.slug}`"
        :href="`#${tab.slug}`"
        :class="{ active: isSelected(tab.slug) }"
        class="nav-link"
        data-toggle="tab"
        role="tab"
        aria-controls="home"
        aria-selected="true"
        @click.prevent="select(tab.slug)"
      >
        {{ tab.label }}
      </a>
    </li>
  </ul>

  <div class="tab-content">
    <template v-for="tab in tabs" :key="tab.slug">
      <TabPane
        :aria-labelledby="`tab-${tab.slug}`"
        :class="{ 'show active': isSelected(tab.slug) }"
      >
        <component :is="tab.slot" />
      </TabPane>
    </template>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import TabPane from './TabPane';

export default {
    name: 'TabGroup',
    components: {
        TabPane,
    },
    props: {
        active: {
            type: String,
            default: null,
        },
    },
    emits: [],
    setup(props) {
        const activeTab = ref(props.active);

        return {
            activeTab,
        };
    },
    computed: {
        tabs() {
            let tabs = [];

            _.forEach(this.$slots, (slot, key) => {
                console.log(slot.$props);
                tabs.push({
                    label: _.startCase(key),
                    slug: _.kebabCase(key),
                    slot: slot,
                });
            });

            return tabs;
        },
        firstSlug() {
            let first = _.first(this.tabs);

            return first ? first.slug : null;
        },
    },
    mounted() {
        if (!this.activeTab) {
            this.select(this.firstSlug);
        }
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
