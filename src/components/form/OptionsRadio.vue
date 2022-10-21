<template>
  <InputRadio
    v-for="(opt, index) in optionsParsed"
    :key="opt.value"
    v-model="modelValue"
    :value="opt.value"
    :inline="inline"
    class="mr-3"
    v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)"
  >
    {{ opt.text }}
  </InputRadio>
</template>

<script>
import FormOptions from 'vio/helpers/FormOptions';
import { toRefs } from 'vue';
import InputRadio from 'vio/components/form/InputRadio.vue';

export default {
    name: 'OptionsRadio',
    components: {
        InputRadio,
    },
    inheritAttrs: false,
    props: {
        name: String,
        modelValue: [String, Number],
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
    },
    mounted() {
    },
    unmounted() {

    },
    methods: {},
};
</script>

<style scoped>

</style>
