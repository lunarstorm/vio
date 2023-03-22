<template>
  <InputGroup class="input-group input-group-alt">
    <InputDate
      :v-model="localFrom"
      :placeholder="labelFrom"
      @change="$emit('update:from', $event)"
    />
    <div class="input-group-prepend input-group-append">
      <div class="input-group-text">
        <slot>to</slot>
      </div>
    </div>
    <InputDate
      :v-model="localTo"
      :placeholder="labelTo"
      @change="$emit('update:to', $event)"
    />
  </InputGroup>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import InputGroup from './InputGroup.vue';
import InputDate from 'vio/components/form/InputDate.vue';

const props = defineProps({
    from: [String, Object],
    to: [String, Object],
    labelFrom: {
        type: String,
        default: 'Start Date',
    },
    labelTo: {
        type: String,
        default: 'End Date',
    },
    options: {
        type: Object,
        default: () => {},
    },
});

const localFrom = ref(props.from);
const localTo = ref(props.to);

const emit = defineEmits(['update:from', 'update:to']);
</script>
