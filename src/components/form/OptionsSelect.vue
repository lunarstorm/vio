<template>
  <select
    v-model="modelValue"
    :name="name"
    class="form-control"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option v-if="placeholder" :value="null" disabled>
      {{ placeholder }}
    </option>
    <option v-for="opt in optionsParsed" :key="opt.value" :value="opt.value">
      {{ opt.text }}
    </option>
  </select>
</template>

<script>
import FormOptions from 'vio/helpers/FormOptions';
import { toRefs } from 'vue';

export default {
    name: 'OptionsSelect',
    components: {},
    inheritAttrs: true,
    props: {
        name: {
            type: String,
            default: '',
        },
        caption: {
            type: Boolean,
            default: true,
        },
        placeholder: {
            type: String,
            default: 'Select an option',
        },
        modelValue: [String, Number],
        options: {
            type: [Array, Object],
            default: [],
        },
    },
    setup(props) {
        return {
            options: toRefs(props).options,
            caption: props.caption,
        };
    },
    computed: {
        optionsParsed() {
            return FormOptions.normalize(this.options);
        },
    },
    mounted() {},
    unmounted() {},
    methods: {},
};
</script>

<style scoped>
</style>
