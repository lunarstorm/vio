<template>
  <textarea
    ref="field"
    v-autosize
    :value="modelValue"
    class="form-control"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
import autosize from 'vio/directives/autosize';

export default {
    name: 'InputTextarea',
    directives: { autosize },
    components: {},
    inheritAttrs: true,
    props: {
        modelValue: [String, Number],
    },
    emits: ['update:modelValue'],
    setup(props) {
        return {};
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
