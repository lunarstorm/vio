<template>
  <modal ref="modalWrapper" @disposed="dispose" v-bind="modalProps">
    <template #default>
      <spinner v-if="waiting" class="text-center text-muted p-5 my-5"></spinner>
      <component v-else :is="component" v-bind="resolvedProps"></component>
    </template>
  </modal>
</template>

<script>
import Modal from "vio/components/modal/Modal";
import Spinner from "vio/components/spinner/Spinner";
import { reactive, ref, toRefs } from "vue";

export default {
  name: "ComponentWrapper",
  inheritAttrs: false,
  components: {
    Modal,
    Spinner,
  },
  props: {
    component: Object,
    props: [Object, Function],
    onDispose: Function,
    modalProps: {
      type: Object,
      default: {},
    },
  },
  emits: ["dispose"],
  setup(props) {
    const modalWrapper = ref(null);
    const waiting = ref(false);
    const resolvedProps = reactive({});

    if (typeof props.props === "function") {
      let promise = props.props();
      if (
        promise &&
        typeof promise.then === "function" &&
        promise[Symbol.toStringTag] === "Promise"
      ) {
        waiting.value = true;
        props.props().then((resolved) => {
          Object.assign(resolvedProps, resolved);
          waiting.value = false;
        });
      } else {
        throw new Error(
          "Component props, when in function form, must be an async function."
        );
      }
    } else {
      Object.assign(resolvedProps, props.props);
    }

    return {
      resolvedProps,
      waiting,
      modalWrapper,
    };
  },
  mounted() {},
  methods: {
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
