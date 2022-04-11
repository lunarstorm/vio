<template>
  <a href="#." @click.prevent="toggle">
    <i v-if="checked" class="fa fa-fw fa-square text-primary" />
    <i v-else class="fa fa-fw fa-square-o text-muted" />
  </a>
</template>

<script>
import {ref} from 'vue';

export default {
    name: 'FauxCheckbox',
    props: {
        checked: {
            type: Boolean,
            default: false,
        },
        size: String,
        disable: Boolean,
    },
    emits: [
        'toggle',
        'checked',
        'unchecked',
    ],
    setup(props) {
        let self = this;
        let size = ref('sm');
        let checkedState = ref(!!props.checked);

        /*watch(checked, function(value, valueOld){
			console.log('Watching checked', value, valueOld);
		});*/

        return {
            checkedState,
            size,
            disable: ref(props.disable),
        };
    },
    methods: {
        toggle() {
            if (this.disable) {
                return false;
            }

            this.checkedState = !this.checkedState;
            this.$emit('toggle', this.checkedState);

            if (this.checkedState) {
                this.$emit('checked');
            } else {
                this.$emit('unchecked');
            }

            return false;
        },
    },
};
</script>

<style scoped>

</style>