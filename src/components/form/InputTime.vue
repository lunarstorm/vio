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
import 'flatpickr/dist/flatpickr.min.css';
import { toRefs } from 'vue';

export default {
    name: 'InputTimeRange',
    components: {},
    props: {
        modelValue: [String, Object],
        options: {
            type: Object,
            default: {},
        },
    },
    emits: [
        'update:modelValue',
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
        let $field = this.$refs.field;

        this.FP = flatpickr($field, {
            allowInput: true,
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            //defaultDate: "13:45",
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
    methods: {},
};
</script>

<style scoped>

</style>