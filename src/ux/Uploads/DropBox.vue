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
    onSuccess: Function,
    onRemove: Function,
  },
  emits: ["success", "finished"],
  setup(props) {
    const container = ref(null);

    return {
      container,
    };
  },
  mounted() {
    let token = null;
    let csrfMetaTag = document.head.querySelector('meta[name="csrf-token"]');
    
    if(csrfMetaTag){
      token = csrfMetaTag.content;
    }

    drop = new Dropzone(this.container, {
      url: this.url,
      headers: {
        "X-CSRF-TOKEN": token,
      },
      ...this.params,
    });

    drop.on("totaluploadprogress", (totalUploadProgress) => {
      if (totalUploadProgress == 100) {
        this.$emit("finished");
      }
    });

    drop.on("removedfile", (file) => {
      if( typeof this.onRemove === "function") {
        this.onRemove(file);
      }
    });

    drop.on("success", (file, response) => {
      this.$emit("success", file, response);
      if (typeof this.onSuccess === "function") {
        this.onSuccess(file, response);
      }
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
