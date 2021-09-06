<template>
  <div>
    <div
      aria-live="polite"
      aria-atomic="true"
      class="d-flex justify-content-center align-items-center"
    >
      <div ref="top" class="toast-container top-left">
        <template v-for="(item, index) in stack['top-left']" :key="index">
          <toast-message :item="item"></toast-message>
        </template>
      </div>

      <div ref="top" class="toast-container top">
        <template v-for="(item, index) in stack['top']" :key="index">
          <toast-message :item="item"></toast-message>
        </template>
      </div>

      <div ref="top" class="toast-container top-right">
        <template v-for="(item, index) in stack['top-right']" :key="index">
          <toast-message :item="item"></toast-message>
        </template>
      </div>

      <div ref="top" class="toast-container bottom-left">
        <template v-for="(item, index) in stack['bottom-left']" :key="index">
          <toast-message :item="item"></toast-message>
        </template>
      </div>

      <div ref="top" class="toast-container bottom">
        <template v-for="(item, index) in stack['bottom']" :key="index">
          <toast-message :item="item"></toast-message>
        </template>
      </div>

      <div ref="top" class="toast-container bottom-right">
        <template v-for="(item, index) in stack['bottom-right']" :key="index">
          <toast-message :item="item"></toast-message>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ToastMessage from "vio/components/notification/Toast";
import { ref, watchEffect } from "vue";
import Messages from "vio/helpers/Messages";

export default {
  name: "MessageContainer",
  components: {
    ToastMessage,
  },
  props: {
    messages: Array,
  },
  setup(props) {
    const items = ref([]);

    return {
      Messages,
      items,
    };
  },
  mounted() {
    watchEffect(() => {
      let limit = 0;
      while (Messages.hasItems()) {
        this.items.push(Messages.pop());

        if (++limit >= 100) {
          break;
        }
      }
    });
  },
  computed: {
    stack() {
      let stack = {
        top: [],
        "top-right": [],
        "top-left": [],

        bottom: [],
        "bottom-right": [],
        "bottom-left": [],
      };

      _.forEach(this.items, (message) => {
        stack[message.position || "top"].push(message);
      });

      return stack;
    },
  },
};
</script>

<style scoped>
.toast-container {
  z-index: 1050;
}
.top {
  position: fixed;
  top: 4.5rem;
}
.top-right {
  position: fixed;
  top: 4.5rem;
  right: 1rem;
}
.top-left {
  position: fixed;
  top: 4.5rem;
  left: 1rem;
}
.bottom {
  position: fixed;
  bottom: 1rem;
}
.bottom-left {
  position: fixed;
  left: 1rem;
  bottom: 1rem;
}
.bottom-right {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
}
</style>
