<template>
  <slot :response="res" :loading="loading"></slot>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  props: {
    url: String,
  },
  components: {},
  setup(props) {
    const res = ref("");
    const loading = ref(true);

    axios
      .get(props.url)
      .then((response) => response.data)
      .then((response) => {
        res.value = response;
        loading.value = false;
      });

    return {
      res,
      loading,
    };
  },
};
</script>

<style scoped>
</style>
