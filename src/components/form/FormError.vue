<template>
  <div v-if="errorText" class="form-text text-danger">
    {{ errorText }}
  </div>
</template>

<script>
import _ from 'lodash';
import { toRefs } from 'vue';

export default {
    name: 'FormError',
    components: {},
    inheritAttrs: true,
    props: {
        modelValue: [Array, String, Number],
    },
    setup(props) {
        const pRefs = toRefs(props);
        return {
            error: pRefs.modelValue,
        };
    },
    computed: {
        errorText() {
            if (_.isArray(this.error)) {
                return this.error.join(', ');
            }

            return this.error;
        },
    },
    mounted() {},
    unmounted() {},
    methods: {},
};
</script>

<style scoped>
</style>