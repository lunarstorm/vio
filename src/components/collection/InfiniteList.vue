<template>
  <div class="list-group list-group-flush list-group-divider">
    <div
      v-for="(item, i) in items"
      :key="i"
      :ref="
        (el) => {
          if (el) divs[i] = el;
        }
      "
      class="list-group-item w-100"
    >
      <div class="list-group-item-body">
        <slot name="item" :item="item" />
      </div>
    </div>
    <div v-if="hasMore" ref="bottom" class="list-group-item text-center w-100">
      <div class="list-group-item-body">
        <button
          :disabled="busy"
          type="button"
          class="btn btn-secondary"
          @click="fetchMore"
        >
          <div v-if="busy">
            <i class="fa fa-spin fa-refresh" /> Loading...
          </div>
          <div v-else>
            Load More
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { ref, toRefs } from 'vue';
import Ui from 'vio/Ui';

export default {
    name: 'InfiniteList',
    props: {
        pageSize: {
            type: Number,
            default: 50,
        },
        fetch: {
            type: Function,
            default: null,
        },
        onMounted: {
            type: Function,
            default: null,
        },
    },
    setup(props) {
        let items = ref([]);
        let page = ref(0);

        return {
            fetches: 0,
            page,
            items,
            hasMore: ref(false),
            pageSize: toRefs(props).pageSize,
            busy: ref(false),
            divs: ref([]),
            onMounted: props.onMounted,
        };
    },
    watch: {
        busy(val) {
            //console.log('emit busy');
            this.$emit('busy', val);
        },
    },
    created() {
        window.addEventListener('scroll', this.onScroll);
    },
    mounted() {
        let self = this;

        this.fetchMore().then(() => {
            if (this.onMounted) {
                this.onMounted(self);
            }
        });
    },
    unmounted() {
        window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
        onScroll: _.throttle(function () {
            if (!this.hasMore) {
                return;
            }
            //const sentinel = this.$refs.bottom;
            let n = this.divs.length;
            let i = Math.max(0, n - 10);
            const sentinel = this.divs[i];

            if (!sentinel) {
                return;
            }

            if (Ui.isElementInViewport(sentinel) && !this.busy) {
                this.fetchMore();
            }
        }, 250),
        async fetchMore(refresh) {
            let pageNext = this.page + 1;
            this.busy = true;

            if (typeof this.fetch === 'function') {
                let data = await this.fetch({
                    page: pageNext,
                    size: this.pageSize,
                });

                if (refresh) {
                    this.items = [];
                }

                this.items.push(...data.items);
                this.hasMore = data.hasMore;
                this.page = pageNext;
                this.fetches++;
            }

            this.busy = false;
        },
        refresh: _.debounce(function () {
            this.page = 0;
            this.fetchMore(true);
        }, 300),
        removeItem(predicate) {
            _.remove(this.items, predicate);
        },
    },
    computed: {},
};
</script>

<style scoped>
</style>
