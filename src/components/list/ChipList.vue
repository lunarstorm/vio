<template>
  <ul class="list-inline">
    <template v-for="(item, index) in itemsParsed" :key="index">
      <li v-if="item.value" class="list-inline-item">
        <TextChip :label="item.label">
          {{ item.value }}
        </TextChip>
      </li>
    </template>
  </ul>
</template>

<script>
import TextChip from 'vio/components/text/TextChip.vue';
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
