<template>
	<div
	  ref="page"
	  class="page"
	  :class="pageClasses()"
	>
		<div v-if="hasSidebar()" class="sidebar-backdrop"></div>

		<div class="page-inner">
			<button
			  v-if="hasSidebar()"
			  class="btn btn-success btn-floated d-xl-none"
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

		<div v-if="hasSidebar()" class="page-sidebar">
			<header class="sidebar-header d-sm-none">
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb">
						<li class="breadcrumb-item active">
							<a
							  href="#"
							  @click.prevent="toggleSidebar"
							>
								<i class="breadcrumb-icon fa fa-angle-left mr-2"></i>
								Back
							</a>
						</li>
					</ol>
				</nav>
			</header>
			<div class="sidebar-section">
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
			default: false
		}
	},
	mounted() {

	},
	computed: {},
	methods: {
		toggleSidebar(){
			Looper.toggleSidebar();
		},
		hasSidebar() {
			return !!this.$slots.sidebar;
		},
		pageClasses() {
			let items = [];

			if (this.hasSidebar()) {
				items.push('has-sidebar has-sidebar-expand-xl')
			}

			if (this.sidebarFluid) {
				items.push('has-sidebar-fluid');
			}

			return items;
		}
	}
}
</script>

<style scoped>

</style>