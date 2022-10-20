<template>
  <TextNumeric :value="value" format="0,0.00">
    <template v-if="symbol">
      {{ symbol }}
    </template>
  </TextNumeric>
</template>

<script>
import TextNumeric from 'vio/components/text/TextNumeric';

export default {
    name: 'TextDollars',
    components: {
        TextNumeric,
    },
    props: {
        value: [String, Number],
        symbol: {
            type: [String, Boolean],
            default: '$',
        },
    },
    setup(props) {},
    computed: {},
    methods: {},
};
</script>

<style scoped>
</style>
