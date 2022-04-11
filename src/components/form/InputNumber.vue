<template>
  <input
    ref="field"
    :value="valueFormatted"
    type="text"
    class="form-control text-right"
    v-bind="$attrs"
    @input.prevent="handleInput"
  >
</template>

<script>
import numeral from 'numeral';

export default {
    name: 'InputNumber',
    components: {},
    props: {
        modelValue: [String, Number],
        format: String,
    },
    emits: ['update:modelValue'],
    setup(props) {
        return {
            options: props.options,
        };
    },
    computed: {
        ref() {
            return this.$refs.field;
        },
        valueFormatted() {
            return numeral(this.modelValue).format(this.format);
        },
    },
    methods: {
        handleInput(event) {
            this.$emit('update:modelValue', this.normalize(event.target.value));
        },
        normalize(raw) {
            // Strip any non digits
            let str = String(raw).replace(/\D/g, '');

            // Normalize
            str = Math.round(parseFloat(str) * 100) / 100 / 100;

            // Format
            let formatted = numeral(str).format('0.00');

            return isNaN(formatted) ? 0 : formatted;
        },
    },
};
</script>

<style scoped>
</style>
