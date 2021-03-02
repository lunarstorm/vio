<template>
	<div ref="container">
		<div v-if="hasSlot('filter')">
			<div class="card">
				<div class="card-body">
					<slot
					  name="filter"
					></slot>
				</div>
			</div>
		</div>

		<div class="card">
			<div v-if="hasSlot('header')" class="card-header">
				<div class="d-flex align-items-center">
					<div class="flex-grow-1">
						<slot name="header"></slot>
					</div>
				</div>
			</div>

			<div class="card-body py-0 bg-light">
				<div class="d-flex align-items-center py-2">
					<div v-if="isBatchSelectable" class="mr-2">
						<faux-checkbox
						  :checked="Batch.isAllSelected()"
						  @toggle="Batch.selectAllToggle()"
						></faux-checkbox>
					</div>
					<div class="flex-grow-1">
						<button-menu
						  v-if="Batch.count() > 0"
						  :items="generateBatchMenu()"
						  class="btn-primary"
						>
							{{ Batch.count() }} Selected
						</button-menu>
						<div v-else class="text-muted">
							<slot name="toolbar"></slot>
						</div>
					</div>
					<div>
						<a
						  @click.prevent="addItem"
						  href="#"
						  class="btn btn-primary"
						>
							<i class="fa fa-plus"></i>
							Add
						</a>
					</div>
				</div>
			</div>

			<infinite-list
			  :fetch="fetch"
			  :on-mounted="onMounted"
			  ref="list"
			  @busy="busy = $event"
			>
				<template v-slot:item="{item}">
					<div class="d-flex align-items-start">
						<div v-if="isBatchSelectable" class="mr-2">
							<faux-checkbox
							  :checked="Batch.isSelected(item.id)"
							  @toggle="Batch.toggle(item.id)"
							></faux-checkbox>
						</div>
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
import {ref, watch, toRefs, defineAsyncComponent} from 'vue';
import BatchSelector from "vio/helpers/BatchSelector";
import InfiniteList from "./InfiniteList";

const ContextMenu = defineAsyncComponent(() => import('vio/components/menu/ContextMenu'));
const FauxCheckbox = defineAsyncComponent(() => import('vio/components/form/FauxCheckbox'));
const ButtonMenu = defineAsyncComponent(() => import('vio/components/menu/ButtonMenu'));

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
		},
		batchSelect: {
			type: [Boolean, Object],
			default: false
		},
		batchMenu: {
			type: [Boolean, Function],
			default: false
		}
	},
	components: {
		ContextMenu,
		InfiniteList,
		FauxCheckbox,
		ButtonMenu
	},
	setup(props) {
		let Batch = new BatchSelector();
		const list = ref(null);

		return {
			list,
			Batch,
			onMounted: props.onMounted,
			busy: ref(false),
			keywords: ref(''),
			fetch: props.fetch,
			searchParams: toRefs(props).filter,
			addItem: props.addItem,
			itemMenu: toRefs(props).itemMenu,
			keywordSearch: props.keywordSearch,
			batchSelect: props.batchSelect,
			batchMenu: props.batchMenu
		}
	},
	created() {

	},
	mounted() {
		let list = this.list;
		let items = list.items;
		this.Batch.bindWithItems(items);

		watch(() => this.keywords,
		  (val) => {
			  list.refresh();
		  }
		);

		watch(() => list.items, (val) => {
			//console.log('items have changed', val);
			this.Batch.bindWithItems(val);
		});
	},
	computed: {
		isBatchSelectable() {
			//console.log('Batch', this.Batch, this.Batch.items);
			return !!this.batchSelect;
		}
	},
	methods: {
		refresh() {
			this.list.refresh();
		},
		generateBatchMenu(){
			let items = [];

			if(typeof this.batchMenu === "function"){
				items.push(...this.batchMenu(this.Batch));
			}

			return items;
		},
		getItemMenu(item) {
			if (this.itemMenu) {
				return this.itemMenu(item);
			}

			return [];
		},
		hasSlot(name) {
			return !!this.$slots[name];
		}
	}
}
</script>

<style scoped>

</style>