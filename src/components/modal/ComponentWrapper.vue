<template>
  <modal ref="modalWrapper" @disposed="dispose" v-bind="modalProps">
    <template #default>
      <component :is="component" v-bind="props"></component>
    </template>
  </modal>
</template>

<script>
import Modal from "vio/components/modal/Modal";
import { ref } from "vue";

export default {
  name: "ComponentWrapper",
  inheritAttrs: false,
  components: {
    Modal,
  },
  props: {
    component: Object,
    props: Object,
    onDispose: Function,
    modalProps: {
      type: Object,
      default: {},
    },
  },
  emits: ["dispose"],
  setup(props) {
    const modalWrapper = ref(null);

    return {
      modalWrapper,
    };
  },
  mounted() {},
  methods: {
    attr() {
      return {
        ...this.modalProps,
        ...this.props,
      };
    },
    dispose() {
      this.$emit("dispose");
    },
    close() {
      this.modalWrapper.close();
    },
  },
};
</script>

<style scoped>
</style>
