<template>
  <div class="table-responsive">
    <table class="table" v-bind="$attrs">
      <template v-if="items && items.length > 0">
        <slot name="head" :page="data" />
        <slot name="body" :page="data">
          <tbody>
            <template v-for="(item, index) in items" :key="item.id">
              <slot
                name="row"
                :item="item"
                :index="index"
                :items="items"
              />
            </template>
          </tbody>
        </slot>
      </template>
      <tbody v-else>
        <tr>
          <td class="p-4 text-center text-muted">
            No Items
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="hasMore" class="card-footer">
    <div class="card-footer-content">
      <div class="d-flex align-items-center text-center">
        <div class="mx-auto align-middle">
          <button type="button" class="btn btn-light" @click.prevent="loadMore">
            Load More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'PagedStream',
    components: {
    },
    inheritAttrs: false,
    props: {
        page: Object,
        wrap: Boolean,
    },
    setup(props){
        const _page = ref(props.page);

        return {
            _page,
        };
    },
    computed: {
        items(){
            return this._page.data;
        },
        meta() {
            if (this._page.meta) {
                return this._page.meta;
            }

            return this._page;
        },
        links() {
            if (this._page.links) {
                return this._page.links;
            }

            return this._page;
        },
        nextUrl(){
            return this.links.next ?? this.links.next_page_url;
        },
        hasMore(){
            return !!this.nextUrl;
        },
    },
    methods: {
        loadMore() {
            if(!this.nextUrl){
                return;
            }

            this.$http
                .make()
                .messages({
                    progress: 'Loading...',
                    position: 'bottomright',
                })
                .get(this.nextUrl)
                .then((res) => {
                    this.update(res.data);
                });
        },
        update(data){
            if(this.wrap){
                this._page.data.push(...data.data);
                this._page.links = data.links;
                this._page.meta = data.meta;
                return;
            }

            this._page.data.push(...data.data);
            this._page.prev_page_url = data.prev_page_url;
            this._page.next_page_url = data.next_page_url;
        },
    },
};
</script>

<style scoped>
</style>
