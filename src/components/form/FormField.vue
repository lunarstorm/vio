<template>
  <div>
    <slot />
    <form-error v-model="error" />
  </div>
</template>

<script>
import FormError from 'vio/components/form/FormError';

export default {
    name: 'FormField',
    components: {
        FormError,
    },
    inheritAttrs: true,
    props: {
        error: [Array, String, Number],
    },
    setup(props) {
        return {};
    },
    computed: {},
    mounted() {},
    unmounted() {},
    methods: {},
};
</script>

<style scoped>
</style>
