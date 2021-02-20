<template>
	<div ref="container">
		<div class="card">
			<div class="card-header">
				<div class="d-flex align-items-center">
					<div class="flex-grow-1">
						<form v-if="keywordSearch" class="form-inline">
							<input
							  v-model="keywords"
							  type="text"
							  placeholder="Search items..."
							  class="form-control"
							/>
							<div v-if="busy" class="mx-2 form-control-static">
								<i class="fa fa-refresh fa-spin text-muted"></i>
							</div>
						</form>
					</div>
					<div>
						<a
						  @click.prevent="addItem"
						  href="#"
						  class="btn btn-primary btn-sm"
						>
							<i class="fa fa-plus"></i>
							Add
						</a>
					</div>
				</div>
			</div>

			<div v-if="hasSlot('filter')" class="card-body">
				<slot name="filter"></slot>
			</div>

			<infinite-list
			  :fetch="fetch"
			  :on-mounted="onMounted"
			  ref="infiniteList"
			  @busy="busy = $event"
			>
				<template v-slot:item="{item}">
					<div class="d-flex align-items-start">
						<div class="flex-grow-1">
							<slot
							  name="item"
							  :item="item"
							></slot>
						</div>
						<div>
							<slot
							  v-if="hasSlot('right')"
							  :item="item"
							  name="right"
							></slot>
							<context-menu :items="getItemMenu(item)"></context-menu>
						</div>
					</div>
				</template>
			</infinite-list>
		</div>
	</div>
</template>

<script>
import io from 'io/common';
import {ref, watch, toRefs} from 'vue';
import InfiniteList from 'vio/components/collection/InfiniteList.vue';
import ContextMenu from 'vio/components/menu/ContextMenu.vue';

export default {
	name: "CollectionIndex",
	comments: true,
	props: {
		dataSource: String,
		filter: {
			type: Object,
			default: {}
		},
		fetch: Function,
		addItem: Function,
		itemMenu: Function,
		onMounted: Function,
		keywordSearch: {
			type: Boolean,
			default: true
		}
	},
	components: {
		ContextMenu,
		InfiniteList,
	},
	setup(props) {

		return {
			onMounted: props.onMounted,
			busy: ref(false),
			keywords: ref(''),
			fetch: props.fetch,
			searchParams: toRefs(props).filter,
			addItem: props.addItem,
			itemMenu: toRefs(props).itemMenu,
			keywordSearch: props.keywordSearch
		}
	},
	created() {
		watch(() => this.keywords,
		  (val) => {
			  this.$refs.infiniteList.refresh();
		  }
		);

		watch(() => this.searchParams,
		  (val) => {
			  console.log('searchParams changed', val);
			  this.$refs.infiniteList.refresh();
		  }
		);
	},
	mounted() {
		let root = this;
		let store = this.$store;
		let container = this.$refs.container;
	},
	computed: {},
	methods: {
		getItemMenu(item) {
			if (this.itemMenu) {
				return this.itemMenu(item);
			}

			return [];
		},
		hasSlot(name) {
			return !!this.$slots[name];
		},
		async fetchItems(options) {
			let extraParams = this.searchParams;

			const response = await io.api.get(this.dataSource, {
				data: {
					p: options.page,
					limit: options.size,
					q: this.keywords,
					...extraParams
				}
			});

			return response.data;
		},
	}
}
</script>

<style scoped>

</style>