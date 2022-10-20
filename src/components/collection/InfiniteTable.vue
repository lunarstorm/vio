<template>
  <div class="table-responsive">
    <table class="table w-100">
      <slot name="head" :items="items" />
      <tbody>
        <template
          v-for="(item, i) in items"
          :key="i"
          :ref="
            (el) => {
              if (el) divs[i] = el;
            }
          "
        >
          <slot
            name="item"
            :item="item"
            :items="items"
            :index="i"
            :num="i + 1"
          />
        </template>
      </tbody>
    </table>

    <div v-if="hasMore" ref="bottom" class="p-2 text-center">
      <div class="">
        <button
          :disabled="busy"
          type="button"
          class="btn btn-secondary"
          @click="fetchMore(false)"
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
import InfiniteList from './InfiniteList.vue';

export default {
    ...InfiniteList,
    name: 'InfiniteTable',
};
</script>

<style scoped>
</style>
