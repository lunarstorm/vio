<template>
	<div class="card">
		<div class="card-body">
			<div class="activity-stream">
				<div v-if="busy" class="float-right">
					<i class="fa fa-refresh fa-spin text-muted"></i>
				</div>

				<ul class="activities">
					<li
					  v-for="(item, index) in items"
					  :key="index"
					  class="stream-item"
					>
						<feed-item :item="item"></feed-item>
					</li>
				</ul>

				<div class="form-group text-center">
					<a href="javascript:void(0)" class="btn btn-xs btn-default" data-bind="visible: fn.isLoading()" style="display: none;">
						<i class="fa fa-refresh fa-spin"></i>
						Loading...
					</a>
					<a href="javascript:void(0)" class="btn btn-xs btn-default" data-bind="click: fn.showMore, visible: !fn.isLoading()" style="display: none;">
						Show more...
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {ref, toRefs, provide, defineAsyncComponent} from 'vue';

const FeedItem = defineAsyncComponent(() => import('./FeedItem.vue'));

export default {
	name: "ActivityFeed",
	props: {
		data: {
			type: [Array, Function],
			default: []
		},
		pageSize: {
			type: Number,
			default: 50
		},
		objectResolver: {
			type: Function,
			default: null
		}
	},
	components: {
		FeedItem,
	},
	setup(props) {
		let propRefs = toRefs(props);
		let items = ref([]);
		let page = ref(0);
		let busy = ref(false);
		let hasMore = ref(false);

		//console.log('Feed', props.items);

		provide('objectResolver', props.objectResolver);

		return {
			items,
			page,
			pageSize: propRefs.pageSize,
			hasMore,
			data: propRefs.data,
			busy
		}
	},
	mounted(){
		this.fetchMore().then(() => {

		});
	},
	methods: {
		async fetchMore(refresh) {
			let pageNext = this.page + 1;
			this.busy = true;

			if (typeof this.data === "function") {
				let data = await this.data({
					page: pageNext,
					size: this.pageSize
				});

				if (refresh) {
					this.items = [];
				}

				this.items.push(...data.items);
				this.hasMore = data.hasMore;
				this.page = pageNext
			}

			this.busy = false;
		},
		reload(){
			this.fetchMore(true);
			this.$forceUpdate();
		}
	}
}
</script>

<style scoped>

</style>