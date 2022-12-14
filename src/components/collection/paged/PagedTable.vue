<template>
  <div class="card">
    <div v-if="!!$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div class="card-header">
      <div class="d-flex align-items-center">
        <div class="text-muted mr-auto">
          <template v-if="meta.total > 0">
            Showing
            <TextNumeric :value="meta.from" />
            to
            <TextNumeric :value="meta.to" />
            of
            <TextNumeric :value="meta.total" />
          </template>
          <template v-else>
            No items
          </template>
        </div>
        <div>
          <Paginator v-if="meta.total > 0" :page="page" />
        </div>
      </div>
    </div>
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
    <div class="card-footer">
      <div class="card-footer-content">
        <div class="d-flex align-items-center">
          <div class="align-middle text-muted">
            Page
            <TextNumeric :value="meta.current_page" />
            of
            <TextNumeric :value="meta.last_page" />
          </div>
          <div class="ml-auto">
            <Paginator v-if="meta.total > 0" :page="page" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paginator from 'vio/components/collection/paged/Paginator.vue';
import TextNumeric from 'vio/components/text/TextNumeric.vue';

export default {
    name: 'PagedTable',
    components: {
        Paginator,
        TextNumeric,
    },
    inheritAttrs: false,
    props: {
        page: Object,
        wrap: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        meta() {
            if (this.wrap) {
                return this.page.meta || {};
            }

            return this.page;
        },
        links() {
            if (this.wrap) {
                return this.page.links || {};
            }

            return this.page;
        },
    },
};
</script>

<style scoped>
</style>
