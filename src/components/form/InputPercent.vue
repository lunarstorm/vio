<template>
  <InputGroup>
    <input
      ref="field"
      :value="valueIn(modelValue)"
      type="text"
      class="form-control"
      v-bind="$attrs"
      @input="updateModelValue($event.target.value)"
    >
    <template #after>
      %
    </template>
  </InputGroup>
</template>
  
<script setup>
import { ref } from 'vue';
import InputGroup from 'vio/components/form/InputGroup.vue';
  
const props = defineProps({
    modelValue: [String, Number],
    label: [String],
    error: [Array, String],
    asInteger: Boolean,
});
  
const emit = defineEmits(['update:modelValue']);
  
const field = ref(null);
  
function valueIn(value) {
    if (props.asInteger) {
        return value;
    }
    return decimalToPercent(value);
}
  
function valueOut(value) {
    if (props.asInteger) {
        return value;
    }
    return percentToDecimal(value);
}
  
function decimalToPercent(value) {
    if (!value) {
        return null;
    }
    return Math.round(value * 100);
}
  
function percentToDecimal(value) {
    return value / 100;
}
  
function updateModelValue(value) {
    emit('update:modelValue', valueOut(value));
}
</script>