<template>
  <div v-if="items.length > 0" class="btn-group">
    <button type="button" class="btn btn-secondary" data-toggle="dropdown">
      <i class="fa fa-ellipsis-h" />
    </button>
    <div class="dropdown-menu dropdown-menu-right" role="menu">
      <DropdownItems :items="items" />
    </div>
  </div>
</template>

<script>
import {ref, toRefs} from 'vue';
import DropdownItems from './DropdownItems.vue';

export default {
    name: 'ContextMenu',
    components: {
        DropdownItems,
    },
    props: {
        items: {
            type: Array,
            default: [],
        },
    },
    setup(props) {

        return {
            items: toRefs(props).items,
        };
    },
    computed: {
        firstItem() {
            if(this.items.length > 0){
                return this.items[0];
            }

            return null;
        },
        firstItemParams(){
            let params = {};

            if(this.firstItem){


            }

            return parmas;
        },
    },
    mounted() {
    },
};
</script>

<style scoped>

</style>