<template>
  <a
    :href="href"
    class="text-muted"
    title="Open in Google Maps"
    target="_blank"
  >
    <i class="fa fa-map-marker" /> {{ addressString }}
  </a>
</template>

<script>
import _ from 'lodash';
import { ref } from 'vue';

export default {
    name: 'LinkAddress',
    props: {
        address: {
            type: [String, Array],
            default: null,
        },
    },
    setup(props) {
        return {};
    },
    computed: {
        href() {
            return `//maps.google.com/?q=${this.addressString}`;
        },
        addressString() {
            let str = this.address;
            if (_.isArray(str)) {
                str = this.address.join(', ');
            }

            return str.trim();
        },
    },
    mounted() {},
};
</script>

<style scoped>
</style>
