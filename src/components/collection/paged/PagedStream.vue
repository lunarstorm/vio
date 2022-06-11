<template>
  <div class="table-responsive">
    <table class="table" v-bind="$attrs">
      <template v-if="page.data && page.data.length > 0">
        <slot name="head" :page="page" />
        <slot name="body" :page="page">
          <tbody>
            <template v-for="(item, index) in page.data" :key="item.id">
              <slot
                name="row"
                :item="item"
                :index="index"
                :items="page.data"
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
  <div v-if="nextUrl" class="card-footer">
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
        const data = ref(props.page);

        return {
            data,
        };
    },
    computed: {
        meta() {
            if (this.page.meta) {
                return this.page.meta;
            }

            return this.page;
        },
        links() {
            if (this.page.links) {
                return this.page.links;
            }

            return this.page;
        },
        nextUrl(){
            return this.links.next ?? this.links.next_page_url;
        },
    },
    methods: {
        loadMore() {
            this.$http
                .make()
                .messages({
                    progress: 'Loading...',
                    position: 'bottomright',
                })
                .get(this.links.next)
                .then((res) => {
                    this.update(res.data);
                });
        },
        update(data){
            if(this.wrap){
                this.data.data.push(...data.data);
                this.data.links = data.links;
                this.data.meta = data.meta;
                return;
            }

            this.data.data.push(...data.data);
            this.data.prev_page_url = data.prev_page_url;
            this.data.next_page_url = data.next_page_url;
        },
    },
};
</script>

<style scoped>
</style>
