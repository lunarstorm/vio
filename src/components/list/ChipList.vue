<template>
  <ul class="list-inline">
    <template v-for="item in itemsParsed">
      <li v-if="item.value" class="list-inline-item">
        <text-chip :label="item.label">
          {{ item.value }}
        </text-chip>
      </li>
    </template>
  </ul>
</template>

<script>
import TextChip from '../text/TextChip';
import {toRefs} from 'vue';
import FormOptions from '../../helpers/FormOptions';

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
            items: toRefs(props).items,
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