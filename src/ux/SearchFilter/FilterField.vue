<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <small class="ml-1">
      <a href="#" @click.prevent="$emit('update:modelValue', null)"> clear </a>
    </small>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    name: 'FilterField',
    components: {},
    props: {
        label: String,
        modelValue: [String, Number, Boolean, Array],
    },
    emits: ['update:modelValue'],
    setup(props) {},
    methods: {},
};
</script>

<style>
</style>
