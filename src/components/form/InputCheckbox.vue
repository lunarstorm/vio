<template>
  <label v-if="inline" class="checkbox-inline mr-4">
    <input
      v-model="model"
      :value="value"
      :name="name"
      type="checkbox"
      class="mr-1"
      v-bind="$attrs"
    >
    <slot />
  </label>
  <div v-else class="checkbox">
    <label>
      <input
        v-model="model"
        :value="value"
        :name="name"
        type="checkbox"
        class="mr-1"
        v-bind="$attrs"
      >
      <slot />
    </label>
  </div>
</template>

<script>
import { toRefs } from 'vue';

export default {
    name: 'InputCheckbox',
    components: {},
    inheritAttrs: false,
    props: {
        name: String,
        modelValue: [String, Number, Boolean, Array],
        value: {
            type: [String, Number, Boolean],
            default: true,
        },
        inline: Boolean,
    },
    emits: ['update:modelValue'],
    setup(props) {
        let propRefs = toRefs(props);

        return {
            value: propRefs.value,
            inline: propRefs.inline,
        };
    },
    computed: {
        model: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            },
        },
    },
    mounted() {},
    unmounted() {},
    methods: {},
};
</script>

<style scoped>
</style>
