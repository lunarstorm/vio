<template>
  <textarea
    ref="field"
    v-autosize
    :value="modelValue"
    class="form-control"
    @input="onInput"
  />
</template>
  
<script setup>
import { ref } from 'vue';
import { default as vAutosize } from 'vio/directives/autosize';
  
const props = defineProps({
    modelValue: [String, Number],
});
  
const emit = defineEmits(['update:modelValue']);
  
const field = ref(null);
  
function onInput(event) {
    emit('update:modelValue', event.target.value);
}
  
function focus() {
    field.value?.focus();
}
</script>
  