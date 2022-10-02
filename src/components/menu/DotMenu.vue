<template>
  <div class="btn-group">
    <slot name="before" />
    <template v-if="!!$slots.items">
      <button
        type="button"
        class="btn btn-light px-2"
        data-toggle="dropdown"
        data-boundary="viewport"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="bi bi-three-dots font-size-130" />
      </button>
      <div class="dropdown-menu" :class="dropdownMenuClasses">
        <slot name="items" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
    name: 'DotMenu',
    components: {},
    props: {
        align: {
            type: String,
            default: 'right',
        },
    },
    setup(props) {
        return {};
    },
    computed: {
        dropdownMenuClasses(){
            let clases = [];

            if(this.align == 'right'){
                clases.push('dropdown-menu-right');
            }

            return clases;
        },
    },
    mounted() { },
};
</script>

<style scoped>
</style>
