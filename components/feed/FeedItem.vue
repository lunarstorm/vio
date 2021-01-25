<template>
	<div class="activity-stream-story">
		<div v-if="children.length == 0">
			<div
			  v-if="item.titleTemplate == '@heading'"
			  class="story-content"
			>
				<div class="content-title heading">
					<small class="text-muted">
						<em>{{ item.title }}</em>
					</small>
				</div>
			</div>
			<div v-else class="story-content">
				<small :title="item.dateString" class="text-muted">
					<time-ago v-if="item.isWithinCutoff" :date-string="item.date"></time-ago>
					<span v-else>{{ item.dateString }}</span>
				</small>

				<div v-if="item.metaData.object" data-bind="with: object" class="object-content">
					<div v-if="objectComponent">
						<div class="p-2 m-2 shadow-sm">
							<component
							  :is="objectComponent.component"
							  v-bind="objectComponent.props"
							></component>
						</div>
					</div>
					<pre v-else>{{ item.metaData.object }}</pre>
				</div>
			</div>
		</div>

		<div v-if="children.length == 1" class="story-content">
			<div v-for="child in children">
				<div v-if="child.metaData">
					<div
					  v-if="!!child.metaData.icon"
					  :class="child.metaData.bgClass"
					  class="content-icon"
					>
						<i :class="child.metaData.icon"></i>
					</div>
					<div class="content-title">
						<span v-html="titleRendered"></span>
					</div>
				</div>

				<div class="clearfix"></div>

				<small :title="child.dateString" class="text-muted">
					<time-ago v-if="child.isWithinCutoff" :date-string="child.date"></time-ago>
					<span v-else>{{ child.dateString }}</span>
				</small>

				<div v-if="objectComponent">
					<div class="m-2 shadow-sm">
						<component
						  :is="objectComponent.component"
						  v-bind="objectComponent.props"
						></component>
					</div>
				</div>
				<div v-else>
					<div v-if="child.details" class="content-details">
						<div v-html="child.details"></div>
					</div>

					<div v-if="child.metaData.object">
						<div class="content-object">
							<div
							  v-if="child.metaData.object.content"
							  v-html="child.metaData.object.content"
							  class="object-content"
							></div>

							<div
							  v-if="child.metaData.object.summary"
							  v-html="child.metaData.object.summary"
							  class="object-summary"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div
		  v-if="children.length > 1"
		  class="story-content"
		>
			<div v-if="item.metaData">
				<div
				  v-if="item.metaData.icon"
				  :class="item.metaData.bgClass"
				  class="content-icon"
				>
					<i :class="item.metaData.icon"></i>
				</div>
				<div class="content-title">
					<span v-html="titleRendered"></span>
				</div>
			</div>

			<div class="clearfix"></div>

			<small class="text-muted">
				<time-ago v-if="item.isWithinCutoff" :Date-string="item.date"></time-ago>
				<span v-else>{{ item.dateString }}</span>

				<a
				  @click.prevent="toggleExpanded"
				  href="#"
				  class="ml-1 text-muted"
				>
					<span v-if="expanded"><i class="fa fa-caret-down"></i> Hide</span>
					<span v-else><i class="fa fa-caret-right"></i> <strong>Show ({{ children.length }})</strong></span>
				</a>
			</small>
		</div>

		<div v-if="expanded">
			<div v-for="child in item.stories">
				<feed-item :item="child"></feed-item>
			</div>
		</div>
	</div>
</template>

<script>
import {toRefs, ref, defineAsyncComponent, inject} from 'vue';
import TimeAgo from 'Vio/components/TimeAgo.vue';
import _ from 'lodash';
import $ from 'jquery';

const FeedItem = defineAsyncComponent(() => import('./FeedItem.vue'));

_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
};

export default {
	name: "FeedItem",
	props: {
		item: {
			type: Object,
			default: {}
		}
	},
	components: {
		TimeAgo,
		FeedItem
	},
	setup(props) {
		//console.log('ActivityItem', props.item);

		return {
			item: toRefs(props).item,
			expanded: ref(false),
			objectResolver: inject('objectResolver')
		}
	},
	computed: {
		children() {
			let item = this.item;

			//console.log('item?', item.stories);

			return item.stories ? item.stories : [];
		},
		title() {
			let item = this.item;

			return item.titleTemplate;
		},
		titleRendered() {
			let self = this;
			let args = {
				actor: '',
				object: '',
				target: '',
				target2: ''
			};

			let template = _.template(this.item.titleTemplate);

			$.each(args, function (name, arg) {
				args[name] = self._render(name);
			});

			//console.log(this.item.titleTemplate, args);

			if (this.children.length > 0) {
				args.n = this.children.length;
			}

			return template(args);
		},
		objectComponent(){
			let item = this.item;

			if(item.metaData.object){
				return this.resolveObjectComponent(item.metaData.object);
			}

			return null;
		}
	},
	methods: {
		resolveObjectComponent(data) {
			const resolver = this.objectResolver;
			//console.log('FeedItem renderObject', data);

			if (typeof resolver === "function") {
				let resolved = resolver(data);
				//console.log('object resolver is a function', resolved);
				return resolved;
			}

			return null;
		},
		toggleExpanded() {
			this.expanded = !this.expanded;
		},
		_implodeWithAnd(a) {
			var str = [a.slice(0, -1).join(', '), a.slice(-1)[0]].join(a.length < 2 ? '' : ' and ')
			return str;
		},
		_render(name) {
			var data = this.item.metaData[name];

			if (!Array.isArray(data)) {
				data = [data];
			}
			var tokens = [];

			$.each(data, function (i, item) {
				var o = {
					url: '',
					displayName: '',
					attr: ' class="meta-' + name + '"',
					...item
				};

				var value = '';
				if (o.url) {
					value = _.template('<a href="{{url}}"{{attr}}>{{displayName}}</a>')(o);
				} else {
					value = _.template('<span{{attr}}>{{displayName}}</span>')(o);
				}

				tokens.push(value);
			});

			return this._implodeWithAnd(tokens);
		},
	}
}
</script>

<style scoped>

</style>