<template>
  <div class="d-flex align-items-center">
    <ul class="pagination mb-0">
      <li
        class="paginate_button page-item previous"
        :class="{'disabled':!page.prev_page_url}"
      >
        <inertia-link
          v-if="page.prev_page_url"
          :href="page.prev_page_url"
          class="page-link"
        >
          <i class="fa fa-lg fa-angle-left mx-1" />
          Prev
        </inertia-link>
        <div v-else class="page-link">
          <i class="fa fa-lg fa-angle-left mx-1" />
          Prev
        </div>
      </li>
      <li
        class="paginate_button page-item next"
        :class="{'disabled':!page.next_page_url}"
      >
        <inertia-link
          v-if="page.next_page_url"
          :href="page.next_page_url"
          class="page-link"
        >
          Next
          <i class="fa fa-lg fa-angle-right mx-1" />
        </inertia-link>
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
    name: 'InertiaPaginator',
    components: {},
    props: {
        page: Object,
    },
};
</script>

<style scoped>

</style>