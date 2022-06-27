<template>
  <slot name="icon">
    <i class="fa fa-phone-square text-dark mr-1" />
  </slot>
  <a
    v-if="number"
    :href="href"
  >
    {{ number }}
  </a>
  <span v-else class="text-muted">N/A</span>
</template>

<script>
import {reactive, ref} from 'vue';

export default {
    name: 'LinkPhone',
    props: {
        number: {
            type: String,
            default: null,
        },
    },
    setup(props) {

        return {
        };
    },
    computed: {
        href() {
            return 'tel:' + this.number;
        },
    },
    mounted() {
    },
};
</script>

<style scoped>

</style>
