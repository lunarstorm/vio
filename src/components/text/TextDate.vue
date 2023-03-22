<template>
  <span>{{ dateFormatted }}</span>
</template>

<script>
import { DateTime } from 'luxon';
import { toRefs } from 'vue';
import Date from 'vio/helpers/Date';

const DATE_FORMAT = 'yyyy-MM-dd';

export default {
    name: 'TextDate',
    props: {
        date: String,
        from: {
            type: String,
            default: null,
        },
        format: {
            type: String,
            default: DATE_FORMAT,
        },
    },
    setup(props) {
        return {
            date: toRefs(props).date,
            format: toRefs(props).format,
        };
    },
    computed: {
        dateObject() {
            return Date.parse(this.date);
        },
        dateFormatted() {
            let dt = this.dateObject;

            try {
                let formatted = dt.toFormat(this.format);
                return formatted;
            } catch (e) {}

            return '';
        },
    },
    methods: {},
};
</script>

<style scoped>
</style>
