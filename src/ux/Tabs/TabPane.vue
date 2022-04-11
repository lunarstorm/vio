<template>
  <div class="tab-pane" role="tabpanel">
    <slot>Tab Content</slot>
  </div>
</template>

<script>

export default {
    name: 'TabPane',
    components: {},
    props: {},
    emits: [],
    setup(props) {
        return {};
    },
    computed: {},
    mounted() {
    },
    methods: {
        clear() {},
    },
};
</script>

<style scoped>
</style>
