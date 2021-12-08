<template>
  <span ref="el" :title="title" :key="dateFormatted">{{ relString }}</span>
</template>

<script>
import { DateTime } from "luxon";
import Date from "vio/helpers/Date";
import { ref, watchEffect } from "vue";

let interval = null;

export default {
  name: "DateRelative",
  props: {
    date: [String, Number],
  },
  setup(props) {
    const dt = Date.parse(props.date);
    const relString = ref(null);

    return {
      dt,
      relString,
    };
  },
  mounted() {
    /* setInterval(() => {
      this.refresh();
    }, this.delay); */
    this.refresh();
  },
  updated() {},
  methods: {
    refresh() {
      this.relString = this.liveDate.toRelative();
    },
  },
  computed: {
    delay() {
      return 1000;
    },
    liveDate() {
      return Date.parse(this.date);
    },
    dateFormatted() {
      this.relString = this.liveDate.toRelative();

      return this.relString;
    },
    title() {
      return this.dt.toLocaleString(DateTime.DATETIME_FULL);
    },
  },
};
</script>

<style scoped>
</style>
