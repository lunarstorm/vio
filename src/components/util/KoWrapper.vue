<template>
  <div ref="container">
    KO-WRAPPER
    <slot />
  </div>
</template>

<script>
import ko from 'knockout';
import { reactive, ref } from 'vue';
import 'knockout-mapping';

export default {
    name: 'KoWrapper',
    props: {
        vm: {
            type: Object,
            default: null,
        },
    },
    setup(props) {

        return {
            vm: props.vm,
        };
    },
    mounted() {
        let self = this;
        ko.applyBindings(this.vm, self.$refs.container);
    },
};
</script>

<style scoped>

</style>