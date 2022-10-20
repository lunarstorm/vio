<template>
  <div class="card">
    <div class="card-body">
      <div class="activity-stream">
        <ul class="activities">
          <li v-for="item in items" class="stream-item">
            <FeedItem :item="item" />
          </li>
        </ul>

        <div class="form-group text-center">
          <a
            href="javascript:void(0)"
            class="btn btn-xs btn-secondary"
            data-bind="visible: fn.isLoading()"
            style="display: none;"
          >
            <i class="fa fa-refresh fa-spin" />
            Loading...
          </a>
          <a
            href="javascript:void(0)"
            class="btn btn-xs btn-secondary"
            data-bind="click: fn.showMore, visible: !fn.isLoading()"
            style="display: none;"
          >
            Show more...
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {toRefs, provide, defineAsyncComponent} from 'vue';

const FeedItem = defineAsyncComponent(() => import('./FeedItem.vue'));

export default {
    name: 'FeedStream',
    components: {
        FeedItem,
    },
    props: {
        items: {
            type: Array,
            default: [],
        },
        offset: {
            type: Number,
            default: 0,
        },
        objectResolver: {
            type: Function,
            default: null,
        },
    },
    setup(props) {
        let propRefs = toRefs(props);

        //console.log('Feed', props.items);

        provide('objectResolver', props.objectResolver);

        return {
            items: propRefs.items,
            offset: propRefs.offset,
        };
    },
};
</script>

<style scoped>

</style>