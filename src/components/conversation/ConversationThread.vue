<template>
	<div role="log" class="conversations">
		<div v-if="params.ord == 'desc' && !params.commentId">
			<div v-if="params.showForm && formParams">
				<conversation-input
				  :params="formParams"
				  @comment-submitted="insertComment"
				></conversation-input>
			</div>
			<div v-else>
				<a
				  @click.prevent="toggleForm"
				  href="#"
				  class="btn btn-sm btn-link">
					Reply
				</a>
			</div>
		</div>

		<div
		  v-if="hasPrev"
		  class="small p-2"
		>
			<span class="text-muted">&mdash;</span>
			<a @click.prevent="prev"
			   href="#"
			   class="text-muted"
			>
				Show Previous {{ noun }}
				<span v-if="nCommentsUnshown > 0">({{ nCommentsUnshown }})</span>
			</a>
		</div>

		<div v-if="params.totalKnown > 0 && http.isBusy('loadingComments')" class="p-2 text-center small">
			<spinner class="text-muted"></spinner>
		</div>

		<!-- .conversation-list -->
		<ul class="conversation-list">
			<!-- .conversation-inbound -->
			<template
			  v-for="comment in comments"
			  :key="comment.id"
			>
				<li class="conversation-inbound">
					<pre>{{ comment.id }}</pre>
					<conversation-item
					  :key="comment.id"
					  :comment-data="comment"
					  :params="{id: comment.id}"
					  :can-reply="params.canReply"
					  :show-replies="params.showReplies && comment.numReplies > 0"
					  @destroyed="removeComment"
					></conversation-item>
				</li><!-- /.conversation-inbound -->
			</template>
		</ul><!-- /.conversation-list -->

		<div v-if="hasNext"
			 class="text-center mb-3"
		>
			<a @click.prevent="next"
			   href="#"
			   class="btn btn-xs btn-secondary"
			>
				Show more...
			</a>
		</div>

		<div v-if="params.ord == 'asc' && !params.commentId">
			<div v-if="params.showForm">
				<conversation-input
				  :params="formParams"
				  @comment-submitted="insertComment"
				  class="my-2"
				></conversation-input>
			</div>
			<div v-else>
				<a
				  @click.prevent="toggleForm"
				  href="#"
				  class="btn btn-sm btn-link"
				>
					Reply
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import {defineAsyncComponent, provide, reactive, ref, toRefs} from 'vue';
import _ from 'lodash';
import http from 'vio/helpers/Http';
import Spinner from 'vio/ui/Spinner.vue';
import Social from "../../helpers/Social";

const ConversationInput = defineAsyncComponent(() => import("./ConversationInput.vue"));
const ConversationItem = defineAsyncComponent(() => import("./ConversationItem.vue"));

export default {
	name: "ConversationThread",
	components: {
		ConversationInput,
		ConversationItem,
		Spinner
	},
	props: {
		params: Object,
		hasFocus: Boolean
	},
	setup(props) {
		let propRefs = toRefs(props);

		let defaults = {
			obj: null,
			oid: null,
			reply_id: null,
			commentId: null,
			parent: null,
			showForm: true,
			showReplies: true,
			showThread: true,
			toggle: false,
			page: 1,
			limit: 3,
			limitNext: 10,
			limitPrev: 10,
			ord: 'asc',
			hasFocus: false,
			afterSubmit: false,
			initials: Social.initials,
			replyingTo: false,
			canReply: true,
			totalKnown: 0
		};

		const params = reactive({
			...defaults,
			...props.params
		});

		//console.log('CommentThread props', propRefs.params);

		const comments = ref([]);
		const hasNext = ref(false);
		const hasPrev = ref(false);
		const total = ref(0);
		const page = ref(params.page);

		const formParams = {
			obj: params.obj,
			oid: params.oid,
			reply_id: params.reply_id,
			hasFocus: params.hasFocus,
			afterSubmit: function (response) {
				params.replyingTo = false;
			},
			afterCancel: function () {
				params.replyingTo = false;
			}
		};

		const busyLoading = ref(false);
		provide('busyLoading', busyLoading);

		//console.log('setup busyLoading', busyLoading);

		return {
			formParams,
			comments,
			params,
			hasNext,
			hasPrev,
			total,
			page,
			busyLoading,
			http
		}
	},
	created() {
		this.fetch({
			type: this.params.ord == 'asc' ? 'append' : 'prepend',
			id: this.params.commentId,
			parent: this.params.parent
		});
	},
	watch: {
		busyLoading: function (val) {
			console.log('Watch busyLoading', val);
		}
	},
	methods: {
		next() {
			if (this.hasNext) {
				this.page++;
				this.fetch({
					type: 'append'
				});
			}

			return false;
		},
		prev() {
			if (this.hasPrev) {
				this.page++;

				let id = null;

				if (this.comments.length > 0) {
					id = this.comments[0].id;
				}

				this.fetch({
					type: 'prepend',
					limit: this.limitPrev,
					ref: id
				});
			}

			return false;
		},
		fetch(o) {
			var self = this;
			o = {
				id: null,
				parent: null,
				type: 'append',
				limit: self.params.limit,
				ref: null,
				...o
			};

			var data = {
				obj: self.params.obj,
				oid: self.params.oid,
				p: self.page,
				l: o.limit,
				ref: o.ref,
				ord: self.params.ord,
				parent: self.params.parent
			};

			if (data.ref) {
				data.p = null;
			}

			if (o.id) {
				data['id'] = o.id;
			}

			//self.busyLoading = true;

			return http
			  .make('loadingComments')
			  .get('/comments', {
				  params: data,
			  }).then(res => {
				  let result = res.data;

				  console.log('o.type', o.type);

				  result.data.map(function (item) {
					  if (o.type === 'append') {
						  self.comments.push(item);
					  } else {
						  self.comments.unshift(item);
					  }
				  });

				  self.total = result.total;
				  self.hasNext = result.current_page < result.last_page;
				  self.hasPrev = result.current_page > 1;
			  });
		},
		toggleForm() {
			this.params.showForm = !this.params.showForm;
			return false;
		},
		insertComment(commentData) {
			if (this.params.ord == 'desc') {
				this.comments.unshift(commentData);
			} else {
				this.comments.push(commentData);
			}
		},
		removeComment(id) {
			let removed = _.remove(this.comments, (item) => item.id == id);
			this.total -= removed.length;
		}
	},
	computed: {
		noun() {
			if (this.params.parent) {
				return 'Replies';
			}

			return 'Comments';
		},
		nCommentsUnshown() {
			return this.total - this.comments.length;
		},
		hasMoreAbove() {

		},
		hasMoreBelow(){

		}
	}
}
</script>

<style scoped>

</style>