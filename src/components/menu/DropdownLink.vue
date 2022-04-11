<template>
  <a
    :href="href"
    class="dropdown-item"
  >
    <slot>Link</slot>
  </a>
</template>

<script>

export default {
    name: 'DropdownLink',
    props: {
        href: String,
    },
    setup(props) {

        return {};
    },
    computed: {},
    mounted() {
    },
};
</script>

<style scoped>

</style>