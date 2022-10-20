<template>
  <InputGroup class="input-group input-group-alt">
    <InputDate
      v-model="from"
      :placeholder="labelFrom"
      @change="$emit('update:from', $event.target.value)"
    />
    <div class="input-group-prepend input-group-append">
      <div class="input-group-text">
        <slot>to</slot>
      </div>
    </div>
    <InputDate
      v-model="to"
      :placeholder="labelTo"
      @change="$emit('update:to', $event.target.value)"
    />
  </InputGroup>
</template>

<script>
import {toRefs} from 'vue';
import InputGroup from './InputGroup.vue';
import InputDate from 'vio/components/form/InputDate';

export default {
    name: 'InputDateRange',
    components: {
        InputGroup,
        InputDate,
    },
    props: {
        from: [String, Object],
        to: [String, Object],
        labelFrom: {
            type: String,
            default: 'Start Date',
        },
        labelTo: {
            type: String,
            default: 'End Date',
        },
        options: {
            type: Object,
            default: {},
        },
    },
    emits: [
        'update:from',
        'update:to',
    ],
    setup(props) {
        let propRefs = toRefs(props);

        return {
            options: propRefs.options,
        };
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    updated() {
    },
    unmounted() {
    },
    methods: {},
};
</script>

<style scoped>

</style>