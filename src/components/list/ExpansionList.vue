<template>
  <ul>
    <li v-for="(item, index) in itemsVisible" :key="index">
      <slot
        name="item"
        :item="item"
        :items="items"
        :index="index"
      />
    </li>
    <li v-if="expandable" class="no-bullet">
      <a href="#" @click.prevent="expanded = true"> + {{ nbMore }} More </a>
    </li>
    <li v-if="collapsible" class="no-bullet">
      <a href="#" @click.prevent="expanded = false"> - Show Less </a>
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'ExpansionList',
    props: {
        items: Array,
        limit: {
            type: Number,
            default: 5,
        },
    },
    setup(props) {
        const expanded = ref(false);

        return {
            expanded,
        };
    },
    computed: {
        safeLimit() {
            return Math.min(this.limit, this.nbTotal);
        },
        itemsVisible() {
            if (this.expanded) {
                return this.items;
            }

            return this.items.slice(0, this.safeLimit);
        },
        collapsed() {
            return !this.expanded;
        },
        nbTotal() {
            return this.items.length;
        },
        nbVisible() {
            return this.itemsVisible.length;
        },
        nbMore() {
            return this.nbTotal - this.nbVisible;
        },
        expandable() {
            return !this.expanded && this.nbMore > 0;
        },
        collapsible() {
            return this.expanded && this.safeLimit < this.nbTotal;
        },
    },
    methods: {
        toggleExpanded() {
            this.expanded = !this.expanded;
        },
    },
};
</script>

<style scoped>
.no-bullet {
  list-style-type: none !important;
}
</style>
