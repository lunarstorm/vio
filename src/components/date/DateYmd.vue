<template>
  <span ref="el" :title="dateFormatted">{{ dateFormatted }}</span>
</template>

<script>
import Date from 'vio/helpers/Date';

export default {
    name: 'DateYmd',
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
            return this.dt.toISODate();
        },
    },
};
</script>
