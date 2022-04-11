<template>
  <div class="chip badge badge-light badge-pill p-2 shadow-sm valign-middle">
    <span v-if="label" class="chip-label small text-muted mr-1">{{ label }}</span>
    <slot />
  </div>
</template>

<script>
import {toRefs, ref} from 'vue';

export default {
    name: 'TextChip',
    components: {},
    props: {
        label: String,
    },
    setup(props) {
        let propRefs = toRefs(props);
        return {
            label: propRefs.label,
        };
    },
    computed: {
    },
    mounted() {
    },
    methods: {},
};
</script>

<style scoped>
.chip {
	font-size: inherit !important;
	font-weight: normal;
}
.chip-label {

}
</style>