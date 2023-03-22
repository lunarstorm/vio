<template>
  <InputRadio
    v-for="(opt, index) in optionsParsed"
    :key="opt.value"
    v-model="localModelValue"
    :value="opt.value"
    :inline="inline"
    class="mr-3"
    v-bind="$attrs"
    @input="onInput"
  >
    {{ opt.text }}
  </InputRadio>
</template>
  
<script setup>
import { ref, computed, watchEffect } from 'vue';
import InputRadio from 'vio/components/form/InputRadio.vue';
import FormOptions from 'vio/helpers/FormOptions';
  
const props = defineProps({
    name: String,
    modelValue: [String, Number],
    options: {
        type: [Array, Object],
        default: [],
    },
    inline: Boolean,
});
  
const emit = defineEmits(['update:modelValue']);
  
const localModelValue = ref(props.modelValue);
  
watchEffect(() => {
    localModelValue.value = props.modelValue;
});
  
const optionsParsed = computed(() => {
    return FormOptions.normalize(props.options);
});
  
function onInput(event) {
    emit('update:modelValue', event.target.value);
}
</script>
  
  <style scoped>
  </style>
  