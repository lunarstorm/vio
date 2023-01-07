<template>
  <input
    ref="field"
    :value="modelValue"
    type="text"
    class="form-control"
    @change="$emit('update:modelValue', $event.target.value)"
  >
</template>

<script>
import flatpickr from 'flatpickr';

const DATE_FORMAT = 'yyyy-MM-dd';

export default {
    name: 'InputDate',
    components: {},
    props: {
        modelValue: [String, Object],
        options: {
            type: Object,
            default: {},
        },
    },
    emits: ['update:modelValue'],
    setup(props) {
        let FP = null;

        return {
            FP,
        };
    },
    computed: {},
    created() { },
    mounted() {
        let $field = this.$refs.field;

        this.FP = flatpickr($field, {
            allowInput: true,
            ...this.options,
        });
    },
    updated() {
        this.FP.setDate(this.modelValue, true);
    },
    unmounted() {
        if (this.FP) {
            this.FP.destroy();
        }
    },
    methods: {
        focus(){
            this.$refs.field?.focus();
        },
    },
};
</script>

<style scoped>
</style>
