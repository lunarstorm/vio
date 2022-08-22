<template>
  <div class="table-responsive">
    <table class="table" v-bind="$attrs">
      <template v-if="items && items.length > 0">
        <slot name="head" :page="page_" />
        <slot name="body" :page="page_">
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
        const page_ = ref(props.page);

        return {
            page_,
        };
    },
    computed: {
        items(){
            return this.page_.data;
        },
        meta() {
            if (this.page_.meta) {
                return this.page_.meta;
            }

            return this.page_;
        },
        links() {
            if (this.page_.links) {
                return this.page_.links;
            }

            return this.page_;
        },
        nextUrl(){
            return this.links.next ?? this.links.nextpage__url;
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
                this.page_.data.push(...data.data);
                this.page_.links = data.links;
                this.page_.meta = data.meta;
                return;
            }

            this.page_.data.push(...data.data);
            this.page_.prevpage__url = data.prevpage__url;
            this.page_.nextpage__url = data.nextpage__url;
        },
    },
};
</script>

<style scoped>
</style>
