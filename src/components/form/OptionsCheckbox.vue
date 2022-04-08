<template>
  <input-checkbox
    v-for="(opt, index) in optionsParsed"
    :key="index"
    v-model="model"
    :value="opt.value"
    :inline="inline"
  >
    {{ opt.text }}
  </input-checkbox>
</template>

<script>
import FormOptions from 'vio/helpers/FormOptions';
import { toRefs } from 'vue';
import InputCheckbox from 'vio/components/form/InputCheckbox';

export default {
    name: 'OptionsCheckbox',
    components: {
        InputCheckbox,
    },
    inheritAttrs: true,
    props: {
        name: String,
        modelValue: [String, Number, Array],
        options: {
            type: [Array, Object],
            default: [],
        },
        inline: Boolean,
    },
    emits: ['update:modelValue'],
    setup(props) {
        return {
            options: toRefs(props).options,
            inline: props.inline,
        };
    },
    computed: {
        optionsParsed() {
            return FormOptions.normalize(this.options);
        },
        model: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            },
        },
    },
    mounted() {},
    unmounted() {},
    methods: {
        change($event) {
            console.log(
                'Options Checkbox change',
                $event.target.value,
                this.modelValue,
            );
        },
    },
};
</script>

<style scoped>
</style>
