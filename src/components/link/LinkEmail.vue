<template>
  <slot name="icon">
    <i class="fa fa-envelope-o text-dark mr-1" />
  </slot>
  <a
    v-if="!!email"
    :href="href"
  >
    {{ email }}
  </a>
  <span v-else class="text-muted">N/A</span>
</template>

<script>
import {ref, toRefs} from 'vue';

export default {
    name: 'LinkEmail',
    props: {
        email: {
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
            return 'mailto:' + this.email;
        },
    },
    mounted() {
    },
};
</script>

<style scoped>

</style>
