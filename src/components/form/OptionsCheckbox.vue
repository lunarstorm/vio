<template>
  <InputCheckbox
    v-for="(opt, index) in optionsParsed"
    :key="index"
    v-model="localModel"
    :value="opt.value"
    :inline="inline"
  >
    <slot name="label" :option="opt">
      {{ opt.text }}
    </slot>
  </InputCheckbox>
</template>
  
<script setup>
import { ref, watchEffect, computed } from 'vue';
import InputCheckbox from 'vio/components/form/InputCheckbox.vue';
import FormOptions from 'vio/helpers/FormOptions';
  
const props = defineProps({
    name: String,
    modelValue: [String, Number, Array],
    options: {
        type: [Array, Object],
        default: [],
    },
    inline: Boolean,
});
  
const emit = defineEmits(['update:modelValue']);
  
const localModel = ref(props.modelValue);
  
watchEffect(() => {
    localModel.value = props.modelValue;
});
  
const optionsParsed = computed(() => {
    return FormOptions.normalize(props.options);
});
  
function change($event) {
    console.log('Options Checkbox change', $event.target.value, localModel.value);
}
  
watchEffect(() => {
    emit('update:modelValue', localModel.value);
});
</script>