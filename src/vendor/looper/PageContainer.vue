<template>
  <div ref="page" class="page" :class="pageClasses()">
    <div v-if="hasSidebar()" class="sidebar-backdrop"></div>

    <div class="page-inner p-2" :style="pageInnerStyle">
      <button
        v-if="hasSidebar()"
        class="btn btn-primary btn-floated d-xl-none"
        type="button"
        data-toggle="sidebar"
      >
        <slot name="sidebar-toggle">
          <i class="fa fa-bars"></i>
        </slot>
      </button>

      <header v-if="!!$slots.titlebar" class="page-title-bar">
        <slot name="titlebar"></slot>
      </header>

      <div class="page-section">
        <slot></slot>
      </div>
    </div>

    <div
      v-if="hasSidebar()"
      class="page-sidebar"
      :class="{ 'page-sidebar-fixed': sidebarFixed }"
      :style="sidebarStyle()"
    >
      <header class="sidebar-header d-sm-none">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active">
              <a href="#" @click.prevent="toggleSidebar">
                <i class="breadcrumb-icon fa fa-angle-left mr-2"></i>
                Back
              </a>
            </li>
          </ol>
        </nav>
      </header>
      <div :class="sidebarClasses()">
        <slot name="sidebar"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageContainer",
  props: {
    sidebarFluid: {
      type: Boolean,
      default: false,
    },
    sidebarFill: Boolean,
    sidebarFixed: Boolean,
    sidebarWidth: [String],
  },
  mounted() {},
  computed: {
    pageInnerStyle() {
      let style = {};

      if (this.sidebarWidth) {
        style["margin-right"] = this.sidebarWidth;
      }

      return style;
    },
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

      if (this.hasSidebar()) {
        items.push("has-sidebar has-sidebar-expand-xl");
      }

      if (this.sidebarFluid) {
        items.push("has-sidebar-fluid");
      }

      return items;
    },
    sidebarClasses() {
      let items = [];

      if (this.sidebarFill) {
        items.push("sidebar-section-fill");
      } else {
        items.push("sidebar-section");
      }

      return items;
    },
    sidebarStyle() {
      let style = {};

      if (this.sidebarWidth) {
        style["width"] = this.sidebarWidth;
        style["max-width"] = this.sidebarWidth;
      }

      return style;
    },
  },
};
</script>

<style scoped>
</style>
