<template>
  <div>
    <slot name="head" />
    <slot />
  </div>
</template>

<script>
import { provide } from 'vue';
import Form from 'vio/helpers/Form';

export default {
    name: 'FormWrapper',
    components: {},
    inheritAttrs: true,
    props: {
        form: [Form],
    },
    setup(props) {
        provide('form', props.form);

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
