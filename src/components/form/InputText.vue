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
  <FormError v-model="errorModel" />
</template>

<script>
import FormError from 'vio/components/form/FormError.vue';
import { ref } from 'vue';

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
        const errorModel = ref(props.error);

        return {
            errorModel,
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
    methods: {
        focus(){
            this.$refs.field?.focus();
        },
    },
};
</script>

<style scoped>
</style>
