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
    name: 'InputATM',
    components: {},
    props: {
        modelValue: [String, Number],
        label: [String],
        error: [Array, String],
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
            return numeral(this.modelValue).format('0.00');
        },
    },
    mounted() {},
    unmounted() {},
    methods: {
        handleInput(event) {
            //this.$emit("update:modelValue", event.target.value);
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
