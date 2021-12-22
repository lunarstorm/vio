<template>
  <div class="table-responsive">
    <table class="table" v-bind="$attrs">
      <template v-if="page.data && page.data.length > 0">
        <slot name="head" :page="page"></slot>
        <slot name="body" :page="page">
          <tbody>
            <template v-for="(item, index) in page.data" :key="item.id">
              <slot
                name="row"
                :item="item"
                :index="index"
                :items="page.data"
              ></slot>
            </template>
          </tbody>
        </slot>
      </template>
      <tbody v-else>
        <tr>
          <td class="p-4 text-center text-muted">No Items</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-if="page.next_page_url" class="card-footer">
    <div class="card-footer-content">
      <div class="d-flex align-items-center text-center">
        <div class="mx-auto align-middle">
          <button @click.prevent="loadMore" type="button" class="btn btn-light">
            Load More
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paginator from "vio/components/collection/paged/Paginator";
import TextNumeric from "vio/components/text/TextNumeric";

export default {
  name: "PagedStream",
  inheritAttrs: false,
  components: {
    Paginator,
    TextNumeric,
  },
  props: {
    page: Object,
  },
  methods: {
    loadMore() {
      this.$http
        .make()
        .messages({
          progress: "Loading...",
          position: "bottomright",
        })
        .get(this.page.next_page_url)
        .then((res) => {
          this.page.data.push(...res.data.data);
          this.page.prev_page_url = res.data.prev_page_url;
          this.page.next_page_url = res.data.next_page_url;
        });
    },
  },
};
</script>

<style scoped>
</style>
