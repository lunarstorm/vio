<template>
  <FormField :error="error" class="form-group">
    <slot />
  </FormField>
</template>

<script>
import { inject } from 'vue';
import FormField from 'vio/components/form/FormField.vue';

export default {
    name: 'FormGroup',
    components: {
        FormField,
    },
    inheritAttrs: true,
    props: {
        error: [Array, String, Number],
    },
    setup(props) {
        const form = inject('form', null);

        return {
            form,
        };
    },
    computed: {},
    mounted() {},
    unmounted() {},
    methods: {},
};
</script>

<style scoped>
</style>
