<template>
  <span ref="el" :title="title">{{ dateFormatted }}</span>
</template>

<script>
import { DateTime } from "luxon";
import Date from "vio/helpers/Date";

export default {
  name: "DateRelative",
  props: {
    date: [String, Number],
  },
  setup(props) {
    const dt = Date.parse(props.date);

    return {
      dt,
    };
  },
  mounted() {},
  updated() {},
  methods: {},
  computed: {
    dateFormatted() {
      return this.dt.toRelative();
    },
    title() {
      return this.dt.toLocaleString(DateTime.DATETIME_FULL);
    },
  },
};
</script>

<style scoped>
</style>