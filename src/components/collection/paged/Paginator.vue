<template>
  <div class="d-flex align-items-center">
    <ul class="pagination mb-0">
      <li
        class="paginate_button page-item previous"
        :class="{ disabled: !prev_page_url }"
      >
        <a v-if="prev_page_url" :href="prev_page_url" class="page-link">
          <i class="fa fa-lg fa-angle-left mx-1" />
          Prev
        </a>
        <div v-else class="page-link">
          <i class="fa fa-lg fa-angle-left mx-1" />
          Prev
        </div>
      </li>
      <li
        class="paginate_button page-item next"
        :class="{ disabled: !next_page_url }"
      >
        <a v-if="next_page_url" :href="next_page_url" class="page-link">
          Next
          <i class="fa fa-lg fa-angle-right mx-1" />
        </a>
        <div v-else class="page-link">
          Next
          <i class="fa fa-lg fa-angle-right mx-1" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'Paginator',
    components: {},
    props: {
        page: Object,
    },
    computed: {
        meta() {
            if (this.page.meta) {
                return this.page.meta;
            }

            return this.page;
        },
        prev_page_url() {
            if (this.page.links?.prev) {
                return this.page.links.prev;
            }

            return this.page.prev_page_url;
        },
        next_page_url() {
            if (this.page.links?.next) {
                return this.page.links.next;
            }

            return this.page.next_page_url;
        },
    },
};
</script>

<style scoped>
</style>
