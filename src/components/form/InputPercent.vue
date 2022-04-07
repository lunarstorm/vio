<template>
  <input-group>
    <input
      ref="field"
      :value="valueIn(modelValue)"
      type="text"
      class="form-control"
      v-bind="$attrs"
      @input="$emit('update:modelValue', valueOut($event.target.value))"
    >
    <template #after>
      %
    </template>
  </input-group>
</template>

<script>
import InputGroup from 'vio/components/form/InputGroup';

export default {
    name: 'InputPercent',
    components: {
        InputGroup,
    },
    inheritAttrs: false,
    props: {
        modelValue: [String, Number],
        label: [String],
        error: [Array, String],
        asInteger: Boolean,
    },
    emits: ['update:modelValue'],
    setup(props) {
        return {
            options: props.options,
        };
    },
    computed: {
        ref() {
            return this.$refs.field;
        },
    },
    mounted() {},
    unmounted() {},
    methods: {
        valueIn(value){
            if(this.asInteger){
                return value;
            }

            return this.decimalToPercent(value);
        },
        valueOut(value){
            if(this.asInteger){
                return value;
            }

            return this.percentToDecimal(value);
        },
        decimalToPercent(value) {
            if (!value) {
                return null;
            }

            return value * 100;
        },
        percentToDecimal(value) {
            return value / 100;
        },
    },
};
</script>

<style scoped>
</style>
