<template>
  <a
    href="#"
    class="dropdown-item"
    @click.prevent="handler"
  >
    <slot>Action</slot>
  </a>
</template>

<script>
import { ref, toRefs } from 'vue';

export default {
    name: 'DropdownAction',
    props: {
        handler: Function,
    },
    setup(props) {

        return {
        };
    },
    computed: {
    },
    mounted() {
    },
};
</script>

<style scoped>

</style>