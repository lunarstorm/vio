<template>
  <MultiSelect
    ref="multiselect"
    v-model="localModelValue"
    :options="optionsNormalized"
    :searchable="true"
    :placeholder="_placeholder"
    :close-on-select="true"
    v-bind="$attrs"
    @change="onChange"
  >
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </MultiSelect>
</template>
  
<script setup>
import '@vueform/multiselect/themes/default.scss';
import MultiSelect from '@vueform/multiselect';
import _ from 'lodash';
import { ref, computed, watchEffect } from 'vue';
import FormOptions from 'vio/helpers/FormOptions';
  
const props = defineProps({
    modelValue: [String, Number, Array, Object],
    placeholder: [String, Number],
    options: {
        type: [Array, Object, Function],
        defaultValue: [],
    },
    async: Boolean,
    clearOption: {
        type: Boolean,
        defaultValue: true,
    },
    error: [Array, String],
    valueMustExist: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const multiselect = ref(null);

const localModelValue = ref(props.modelValue);

watchEffect(() => {
    localModelValue.value = props.modelValue;
});

const optionsNormalized = computed(() => {
    if (props.async) {
        return props.options;
    }

    return FormOptions.normalize(props.options);
});

const selectedValueExists = computed(() => {
    if (!props.modelValue) {
        return true;
    }

    let opts = optionsNormalized.value;
    let index = _.findIndex(opts, (item) => {
        if (!item) {
            return false;
        }

        return item.value == props.modelValue;
    });

    return index > -1;
});

const _placeholder = computed(() => {
    if (!selectedValueExists.value && !props.valueMustExist) {
        return `${props.modelValue}`;
    }

    return props.placeholder;
});

function onChange(value) {
    emit('update:modelValue', value);
}

function clear() {
    multiselect.value.clear();
}
</script>
  