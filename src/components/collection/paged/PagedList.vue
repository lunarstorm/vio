<template>
  <div class="card">
    <div class="table-responsive">
      <table class="table" v-bind="$attrs">
        <template v-if="page.data && page.data.length > 0">
          <slot name="head" :page="page" />
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
    <div class="card-footer">
      <div class="card-footer-content">
        <div class="d-flex align-items-center">
          <div class="align-middle text-muted">
            Page
            <text-numeric :value="page.current_page" />
            of
            <text-numeric :value="page.last_page" />
          </div>
          <div class="ml-auto">
            <paginator v-if="page.total > 0" :page="page" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paginator from 'vio/components/collection/paged/Paginator';
import TextNumeric from 'vio/components/text/TextNumeric';

export default {
    name: 'PagedList',
    components: {
        Paginator,
        TextNumeric,
    },
    inheritAttrs: false,
    props: {
        page: Object,
    },
};
</script>

<style scoped>
</style>
