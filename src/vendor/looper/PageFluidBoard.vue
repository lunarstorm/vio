<template>
  <div
    ref="page"
    class="page"
    :class="pageClasses()"
  >
    <div class="sidebar-backdrop" />

    <div class="page-inner page-inner-fill position-relative">
      <slot name="board" />
    </div>

    <div class="page-sidebar">
      <header class="sidebar-header d-xl-none">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">
              <a
                href="#"
                @click.prevent="toggleSidebar"
              >
                <i class="breadcrumb-icon fa fa-angle-left mr-2" />
                Back
              </a>
            </li>
          </ol>
        </nav>
      </header>
      <div class="sidebar-section sidebar-section-fill">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PageFluidBoard',
    props: {},
    computed: {},
    mounted() {

    },
    methods: {
        toggleSidebar() {
            Looper.toggleSidebar();
        },
        hasSidebar() {
            return !!this.$slots.sidebar;
        },
        pageClasses() {
            let items = [];

            items.push('has-sidebar has-sidebar-expand-xl');
            items.push('has-sidebar-fluid');

            return items;
        },
    },
};
</script>

<style scoped>

</style>