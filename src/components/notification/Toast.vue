<template>
  <div
    ref="root"
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    style="min-width: 250px; opacity: 0.9"
    :class="classes.main"
  >
    <div v-if="message.data.title" class="toast-header">
      <div class="d-flex align-items-center w-100">
        <i class="fa fa-square mr-1" :class="'text-' + message.data.level"></i>
        <strong class="mr-auto" :class="'text-' + message.data.level">
          {{ message.data.title || title }}
        </strong>
        <button
          type="button"
          class="ml-auto mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
        >
          <span aria-hidden="true" class="text-white">&times;</span>
        </button>
      </div>
    </div>
    <div class="toast-body d-flex align-items-center">
      <div>
        <div
          v-if="message.data.spin"
          class="spinner-grow spinner-grow-sm mr-2 text-muted"
          role="status"
        ></div>
        {{ message.data.text }}
      </div>
      <button
        v-if="message.data.closeable"
        @click.prevent="hide"
        type="button"
        class="ml-auto my-0 close"
        aria-label="Close"
      >
        <span aria-hidden="true" :class="classes.foreground">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import Message from "vio/helpers/Message";
import { ref, watch, watchEffect } from "vue";

export default {
  name: "Toast",
  props: {
    message: Message,
  },
  setup(props) {
    const root = ref(null);
    let timer = null;

    return {
      root,
      timer,
    };
  },
  mounted() {
    this.refresh();

    watch(
      () => this.message.data.ticks,
      (tick) => {
        this.refresh();
      }
    );

    watchEffect(() => {
      if (!this.message.data.visible) {
        this.hide();
      }
    });
  },
  computed: {
    title() {
      switch (this.message.data.level) {
        case "warning":
          return "Warning";
      }

      return "Notice";
    },
    classes() {
      let classes = {
        main: [],
        header: [],
        foreground: [],
        background: [],
      };

      let item = this.message.data;

      if (item.ticks < 1) {
        classes.main.push("fade");
      }

      if (item.level) {
        classes.background.push("bg-" + item.level);
        //classes.header.push('bg-' + item.level);

        switch (item.level) {
          case Message.LEVEL_WARNING:
          case Message.LEVEL_LIGHT:
            classes.foreground.push("text-dark");
            break;
          case Message.LEVEL_SUCCESS:
          default:
            classes.foreground.push("text-white");
        }
      }

      classes.main.push(...classes.background);
      classes.main.push(...classes.foreground);
      classes.header.push(...classes.foreground);

      return classes;
    },
  },
  unmounted() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },
  methods: {
    init() {
      $(this.$refs.root).toast({
        ...this.message.data,
        autohide: false, // handle the hiding manually
      });
    },
    resetTimers() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    show() {
      console.log("show()");
      $(this.$refs.root).toast("show");
    },
    hide() {
      console.log("hide()");
      $(this.$refs.root).toast("hide");
    },
    dispose() {
      $(this.$refs.root).toast("dispose");
    },
    refresh() {
      this.resetTimers();
      this.init();
      this.show();

      if (this.message.data.autohide) {
        console.log("Hide in", this.message.data.delay);
        this.timer = setTimeout(() => {
          this.hide();
        }, this.message.data.delay);
      }
    },
  },
};
</script>

<style scoped>
</style>
