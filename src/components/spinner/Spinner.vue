<template>
  <div>
    <span class="spinner-border"></span>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Spinner",
  props: {
    css: String,
  },
  setup(props) {
    return {
      css: ref(props.css),
    };
  },
  methods: {},
};
</script>

<style scoped>
</style>