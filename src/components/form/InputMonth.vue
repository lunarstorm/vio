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
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';
import {toRefs} from 'vue';

export default {
    name: 'InputMonth',
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
        let propRefs = toRefs(props);
        let FP = null;

        return {
            options: propRefs.options,
            FP,
        };
    },
    computed: {
    },
    created() {
    },
    mounted() {
        let $field = this.$refs.field;

        this.FP = flatpickr($field, {
            ...this.options,
            allowInput: true,
            plugins:[new monthSelectPlugin({
                dateFormat: 'Y-m',
            })],
        });

    },
    updated(){
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