<template>
  <div class="input-group" :class="classes">
    <div v-if="!!$slots.start" class="input-group-prepend">
      <slot name="start" />
    </div>
    <label v-if="!!$slots.before" class="input-group-prepend">
      <span class="input-group-text"><slot name="before" /></span>
    </label>
    <slot />
    <label v-if="!!$slots.after" class="input-group-append">
      <span class="input-group-text"><slot name="after" /></span>
    </label>
    <div v-if="!!$slots.end" class="input-group-append">
      <slot name="end" />
    </div>
  </div>
</template>

<script>
export default {
    name: 'InputGroup',
    components: {},
    inheritAttrs: true,
    props: {
        alt: {
            type: Boolean,
            default: true,
        },
    },
    setup(props) {
        return {};
    },
    computed: {
        classes() {
            let c = [];

            if (this.alt) {
                c.push('input-group-alt');
            }

            return c;
        },
    },
    mounted() {},
    unmounted() {},
    methods: {},
};
</script>

<style scoped>
</style>
