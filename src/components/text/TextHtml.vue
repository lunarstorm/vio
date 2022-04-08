<template>
  <div v-html="textHtml" />
</template>

<script>
import { ref, toRefs } from 'vue';

export default {
    name: 'TextHtml',
    props: {
        text: String,
    },
    setup(props) {
        return {
            text: toRefs(props).text,
        };
    },
    computed: {
        textHtml() {
            return this.nl2br(this.text);
        },
    },
    methods: {
        nl2br(text) {
            return text ? text.replace(/\n/g, '<br />') : '';
        },
    },
};
</script>

<style scoped>
</style>
