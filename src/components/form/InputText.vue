<template>
  <label v-if="label">{{ label }}</label>
  <input
    ref="field"
    :value="modelValue"
    type="text"
    class="form-control"
    v-bind="$attrs"
    @input="$emit('update:modelValue', $event.target.value)"
  >
  <form-error v-model="error" />
</template>

<script>
import FormError from 'vio/components/form/FormError';

export default {
    name: 'InputText',
    components: {
        FormError,
    },
    inheritAttrs: false,
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
    },
    mounted() {},
    unmounted() {},
    methods: {},
};
</script>

<style scoped>
</style>
