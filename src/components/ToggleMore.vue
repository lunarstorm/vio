<template>
  <div>
    <div class="d-flex align-items-center" v-bind="$attrs">
      <div>
        <a v-if="enabled" href="#" @click.prevent="toggle">
          <i
            :class="{ 'fa-rotate-90': isExpanded }"
            class="fa fa-caret-right mr-1"
          />
          <slot name="title" />
        </a>
        <strong v-else class="text-muted">
          <i class="fa fa-caret-right mr-1" />
          <slot name="title" />
        </strong>
      </div>
      <div class="ml-1 flex-grow-1">
        <slot name="extra" />
      </div>
    </div>
    <div v-if="isExpanded" class="mt-1">
      <slot name="more" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'ToggleMore',
    inheritAttrs: false,
    props: {
        expanded: {
            type: Boolean,
            default: false,
        },
        disable: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        return {
            isExpanded: ref(props.expanded),
            disabled: ref(props.disable),
        };
    },
    computed: {
        enabled() {
            return !this.disabled;
        },
    },
    methods: {
        toggle() {
            this.isExpanded ^= true;
            return false;
        },
    },
};
</script>

<style scoped>
</style>
