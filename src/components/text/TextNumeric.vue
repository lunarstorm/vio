<template>
  <span><slot /><span v-if="isNumeric(value)">{{ valueFormatted }}</span></span>
</template>

<script>
import numeral from 'numeral';
import { toRefs } from 'vue';

export default {
    name: 'TextNumeric',
    props: {
        value: [String, Number],
        format: {
            type: String,
            default: '0,0',
        },
        precision: Number,
    },
    setup(props) {
        return {
            value: toRefs(props).value,
            format: toRefs(props).format,
        };
    },
    computed: {
        numeralInstance() {
            return numeral(this.value);
        },
        valueFormatted() {
            return this.numeralInstance.format(this.format);
        },
    },
    methods: {
        isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
    },
};
</script>

<style scoped>
</style>
