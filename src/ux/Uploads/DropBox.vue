<template>
  <div ref="container" class="dropzone"></div>
</template>

<script>
import { ref } from "vue";
import { Dropzone } from "dropzone";
import "dropzone/dist/dropzone.css";

let drop = null;

export default {
  name: "DropBox",
  components: {},
  emits: [],
  props: {
    url: String,
    params: Object,
  },
  emits: ["success"],
  setup(props) {
    const container = ref(null);

    return {
      container,
    };
  },
  mounted() {
    drop = new Dropzone(this.container, {
      url: this.url,
      ...this.params,
    });

    drop.on("success", (file) => {
      this.$emit("success", file);
    });
  },
  unmounted() {
    if (drop) {
      //drop.destroy();
    }
  },
  computed: {},
  methods: {
    clear() {},
  },
};
</script>

<style scoped>
</style>
