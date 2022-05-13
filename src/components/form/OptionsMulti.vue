<template>
  <multi-select
    ref="multiselect"
    v-model="modelValue"
    :options="optionsNormalized"
    :searchable="true"
    :placeholder="_placeholder"
    :close-on-select="true"
    v-bind="$attrs"
    @change="$emit('update:modelValue', $event)"
  >
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </multi-select>
</template>

<script>
import '@vueform/multiselect/themes/default.scss';
import MultiSelect from '@vueform/multiselect';
import FormOptions from 'vio/helpers/FormOptions';
import _ from 'lodash';

export default {
    name: 'OptionsMulti',
    components: {
        MultiSelect,
    },
    inheritAttrs: false,
    props: {
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
    },
    emits: ['update:modelValue'],
    setup(props) {
        return {};
    },
    computed: {
        optionsNormalized() {
            if (this.async) {
                return this.options;
            }

            return FormOptions.normalize(this.options);
        },
        selectedValueExists() {
            if (!this.modelValue) {
                return true;
            }

            let opts = this.optionsNormalized;
            let index = _.findIndex(opts, (item) => {
                if (!item) {
                    return false;
                }

                return item.value == this.modelValue;
            });

            return index > -1;
        },
        _placeholder() {
            if (!this.selectedValueExists && !this.valueMustExist) {
                return `${this.modelValue}`;
            }

            return this.placeholder;
        },
    },
    mounted() {},
    unmounted() {},
    methods: {
        clear() {
            this.$refs.multiselect.clear();
        },
    },
};
</script>

<style scoped>
</style>
