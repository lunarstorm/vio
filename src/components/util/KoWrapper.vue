<template>
  <div ref="container">
    KO-WRAPPER
    <slot />
  </div>
</template>

<script>
import {reactive, ref} from 'vue';
import ko from 'knockout';
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