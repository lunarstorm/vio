<template>
  <div>
    <div
      aria-live="polite"
      aria-atomic="true"
      class="d-flex justify-content-center align-items-center"
    >
      <div ref="top" class="toast-container top-left">
        <template
          v-for="(message, index) in stack[Message.POS_TOP_LEFT]"
          :key="index"
        >
          <ToastMessage :message="message" />
        </template>
      </div>

      <div ref="top" class="toast-container top">
        <template
          v-for="(message, index) in stack[Message.POS_TOP]"
          :key="index"
        >
          <ToastMessage :message="message" />
        </template>
      </div>

      <div ref="top" class="toast-container top-right">
        <template
          v-for="(message, index) in stack[Message.POS_TOP_RIGHT]"
          :key="index"
        >
          <ToastMessage :message="message" />
        </template>
      </div>

      <div ref="top" class="toast-container bottom-left">
        <template
          v-for="(message, index) in stack[Message.POS_BOTTOM_LEFT]"
          :key="index"
        >
          <ToastMessage :message="message" />
        </template>
      </div>

      <div ref="top" class="toast-container bottom">
        <template
          v-for="(message, index) in stack[Message.POS_BOTTOM]"
          :key="index"
        >
          <ToastMessage :message="message" />
        </template>
      </div>

      <div ref="top" class="toast-container bottom-right">
        <template
          v-for="(message, index) in stack[Message.POS_BOTTOM_RIGHT]"
          :key="index"
        >
          <ToastMessage :message="message" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import ToastMessage from 'vio/components/notification/Toast.vue';
import Messages from 'vio/helpers/Messages';
import Message from 'vio/helpers/Message';

export default {
    name: 'MessageContainer',
    components: {
        ToastMessage,
    },
    props: {
        messages: Array,
    },
    setup(props) {
        return {
            Messages,
            Message,
        };
    },
    computed: {
        items() {
            return Messages.queue.value;
        },
        stack() {
            let stack = {};

            stack[Message.POS_TOP] = [];
            stack[Message.POS_TOP_LEFT] = [];
            stack[Message.POS_TOP_RIGHT] = [];
            stack[Message.POS_BOTTOM] = [];
            stack[Message.POS_BOTTOM_LEFT] = [];
            stack[Message.POS_BOTTOM_RIGHT] = [];

            _.forEach(this.items, (message) => {
                let pos = message.data.position || Message.POS_TOP;
                stack[pos].push(message);
            });

            return stack;
        },
    },
    mounted() {
    /* watchEffect(() => {
      let limit = 0;
      while (Messages.hasItems()) {
        this.items.push(Messages.pop());

        if (++limit >= 100) {
          break;
        }
      }
    }); */
    },
};
</script>

<style scoped>
.toast-container {
  z-index: 9200 !important;
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
