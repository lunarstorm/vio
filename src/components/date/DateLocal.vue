<template>
  <span ref="el" :title="dateFormatted">{{ dateFormatted }}</span>
</template>

<script>
import { DateTime } from 'luxon';
import Date from 'vio/helpers/Date';

export default {
    name: 'DateLocal',
    props: {
        date: [String, Number],
    },
    setup(props) {
        const dt = Date.parse(props.date);

        return {
            dt,
        };
    },
    computed: {
        dateFormatted() {
            return this.dt.toLocaleString(DateTime.DATETIME_FULL);
        },
    },
};
</script>
