<template>
  <select
    v-model="localModelValue"
    :name="name"
    class="form-control"
    @change="onChange"
  >
    <option v-if="placeholder" :value="null" disabled>
      {{ placeholder }}
    </option>
    <option v-for="opt in optionsParsed" :key="opt.value" :value="opt.value">
      {{ opt.text }}
    </option>
  </select>
</template>

<script setup>
import { ref, watchEffect, computed } from 'vue';
import FormOptions from 'vio/helpers/FormOptions';

const props = defineProps({
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
});

const emit = defineEmits(['update:modelValue']);

const localModelValue = ref(props.modelValue);

watchEffect(() => {
    localModelValue.value = props.modelValue;
});

const optionsParsed = computed(() => {
    return FormOptions.normalize(props.options);
});

function onChange(event) {
    emit('update:modelValue', event.target.value);
}
</script>