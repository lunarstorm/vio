<template>
  <input-group>
    <input-time
      v-model="from"
      @change="$emit('update:from', $event.target.value)"
    />
    <div class="input-group-prepend input-group-append">
      <div class="input-group-text">
        <slot>to</slot>
      </div>
    </div>
    <input-time
      v-model="to"
      @change="$emit('update:to', $event.target.value)"
    />
  </input-group>
</template>

<script>
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {toRefs} from 'vue';
import InputGroup from './InputGroup';
import InputTime from './InputTime';

const DATE_FORMAT = 'yyyy-MM-dd';

export default {
    name: 'InputTimeRange',
    components: {
        InputGroup,
        InputTime,
    },
    props: {
        from: [String, Object],
        to: [String, Object],
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
        let FP = null;

        return {
            options: propRefs.options,
            FP,
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