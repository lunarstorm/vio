<template>
  <label v-if="label">{{ label }}</label>
  <div class="nouislider-wrapper">
    <div
      ref="sliderRef"
      class="mt-2 mb-5 pb-2 mx-1"
    ></div>
  </div>
  <form-error v-model="error"></form-error>
</template>

<script>
import FormError from "vio/components/form/FormError";
import noUiSlider from 'nouislider';
import {ref} from 'vue';
export default {
  name: "InputNumberRange",
  inheritAttrs: false,
  components: {
    FormError,
  },
  props: {
    modelValue: [Array],
    label: [String],
    error: [Array, String],
  },
  emits: ["update:modelValue"],
  setup(props) {
    return {
      ...props,
      sliderRef:ref(null),
      options:props.options
    };
  },
  computed: {},
  methods: {
    emit(values,handle){
      const vals = [parseInt(values[0]),parseInt(values[1])]
      console.log(vals)
      this.$emit('update:modelValue',vals)
    }
  },
  mounted() {
    noUiSlider.create(this.sliderRef, {
      start: this.modelValue,
      tooltips: [true, true],
      connect: true,
      range: {
        min: this.modelValue[0],
        max: this.modelValue[1],
      },
      step:1,
      pips: {
          mode: 'range',
          density: 4
      }
    });
    console.log()
    this.sliderRef.noUiSlider.on('update',this.emit)
  },
  unmounted() {},
};
</script>

<style >
.noUi-tooltip {
    display: none;
}
.noUi-active .noUi-tooltip {
    display: block;
}
</style>
