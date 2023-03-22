<template>
  <a href="#." @click.prevent="toggle">
    <i v-if="checkedState" class="fa fa-fw fa-square text-primary" />
    <i v-else class="fa fa-fw fa-square-o text-muted" />
  </a>
</template>
  
<script setup>
import { ref } from 'vue';
  
const props = defineProps({
    checked: {
        type: Boolean,
        default: false,
    },
    size: String,
    disable: Boolean,
});
  
const emit = defineEmits(['toggle', 'checked', 'unchecked']);
  
const size = ref('sm');
const checkedState = ref(!!props.checked);
const disable = ref(props.disable);
  
function toggle() {
    if (disable.value) {
        return false;
    }
  
    checkedState.value = !checkedState.value;
    emit('toggle', checkedState.value);
  
    if (checkedState.value) {
        emit('checked');
    } else {
        emit('unchecked');
    }
  
    return false;
}
</script>
