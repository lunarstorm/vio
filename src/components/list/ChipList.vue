<template>
  <ul class="list-inline">
    <template v-for="(item, index) in itemsParsed" :key="index">
      <li v-if="item.value" class="list-inline-item">
        <text-chip :label="item.label">
          {{ item.value }}
        </text-chip>
      </li>
    </template>
  </ul>
</template>

<script>
import TextChip from 'vio/components/text/TextChip';
import FormOptions from 'vio/helpers/FormOptions';

export default {
    name: 'ChipList',
    components: {
        TextChip,
    },
    props: {
        items: [Array, Object],
    },
    setup(props) {
        return {
        };
    },
    computed: {
        itemsParsed(){
            return FormOptions.normalize(this.items);
        },
    },
    mounted() {
    },
    methods: {},
};
</script>

<style scoped>

</style>
