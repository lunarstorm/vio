<template>
	<div ref="container">
		<div class="media p-2">
			<div
			  :style="comment.avatar"
			  class="align-self-start text-center rounded-circle shadow-sm p-2"
			  style="width: 40px; height: 40px;"
			>
				<strong>
					{{ comment.initials }}
				</strong>
			</div>
			<div class="media-body mx-3">
				<div>
					<div class="mt-0">
						<div>
							<small>
								<strong>
									{{ comment.author }}
								</strong>
							</small>

							<small
							  :title="comment.dateString"
							  class="ml-2 text-muted"
							>
								<time-ago v-if="comment.isWithinCutoff" :value="comment.date"></time-ago>
								<span v-else>{{ comment.dateString }}</span>
							</small>

							<small
							  v-if="!isEdit && comment.canEdit"
							  class="ml-2"
							>
								<a
								  @click.prevent="isEdit = true"
								  href="#"
								  class="text-muted">
									edit
								</a>
								&middot;
								<a
								  @click.prevent="del"
								  href="#"
								  class="text-muted">
									delete
								</a>
							</small>
						</div>
					</div>

					<div v-if="isEdit">
						<form
						  @submit.prevent="save"
						  method="POST"
						>
							<input-textarea v-model="comment.body" rows="1"></input-textarea>

							<div class="mt-2">
								<button
								  :disable="isSaving"
								  type="submit"
								  class="btn btn-primary"
								>
									<i v-if="isSaving"
									  class="fa fa-refresh fa-spin mr-1"
									></i>
									Save
								</button>

								<button
								  @click="isEdit = false"
								  type="button"
								  class="btn btn-link"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
					<div v-else>
						<div v-html="comment.bodyHtml" data-bind="html: bodyHtml"></div>
					</div>
				</div>

				<div
				  v-if="canReply"
				  class="pb-3"
				>
					<div>
						<a
						  v-if="comment.numReplies > 0"
						  @click.prevent="toggleReplies"
						  href="#"
						  class="btn-sm btn-link font-weight-bold pl-0"
						>
					<span
					  v-if="showReplies"
					>
						<i class="fa fa-caret-down"></i>
						Replies
					</span>
							<span v-else>
						<i class="fa fa-caret-right"></i>
						Replies ({{ comment.numReplies }})
					</span>
						</a>

						<a
						  v-if="comment.numReplies == 0"
						  @click.prevent="toggleReply"
						  href="#"
						  class="btn-sm btn-link pl-0"
						>
							Reply
						</a>
					</div>
					<div v-if="showReplies">
						<comment-replies :params="replyThreadParams"></comment-replies>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
import {
	toRefs,
	reactive,
	ref,
	computed
} from 'vue';
import api from 'io/api';
import TimeAgo from "components/ui/etc/TimeAgo.vue";
import CommentReplies from "./CommentThread.vue";
import InputTextarea from "../form/InputTextarea";

export default {
	name: "CommentItem",
	components: {
		TimeAgo,
		CommentReplies,
		InputTextarea
	},
	emits: ['destroyed'],
	props: {
		params: Object,
		commentData: Object,
		canReply: Boolean,
		showReplies: Boolean,
		numReplies: Number
	},
	setup(props) {
		let comment = reactive(props.commentData);
		const isEdit = ref(false);

		//console.log(comment.body, comment.numReplies);

		return {
			comment,
			isEdit,
			isSaving: ref(false),
			canReply: ref(props.canReply),
			showReplies: ref(props.showReplies),
			clickedReply: ref(false)
		};
	},
	methods: {
		toggleReply() {
			this.clickedReply = true;
			this.toggleReplies();
		},
		toggleReplies() {
			this.showReplies = !this.showReplies;

			if (!this.showReplies) {
				this.clickedReply = false;
			}

			return false;
		},
		save() {
			let self = this;
			let comment = this.comment;

			self.isSaving = true;

			return api.post('comments', {
				id: comment.id,
				data: {
					_json: JSON.stringify(comment)
				}
			}).done(function (response) {
				if (response.status == 'success') {
					Object.assign(comment, response.data);
					self.isEdit = false;
				}
				self.isSaving = false;
			});
		},
		del() {
			let self = this;
			let commentId = this.comment.id;
			return api.post('comments/delete', {
				id: commentId
			}).done(function (response) {
				self.$emit('destroyed', commentId);
			});
		}
	},
	computed: {
		replyThreadParams() {
			let comment = this.comment;
			let replyId = comment.reply_id ? comment.reply_id : comment.id;
			var showForm = comment.numReplies == 0;

			var params = {
				obj: comment.obj,
				oid: comment.oid,
				reply_id: replyId,
				parent: comment.id,
				limit: 1,
				showForm: showForm,
				totalKnown: comment.numReplies,
				canReply: comment.canReply,
				placeholder: computed(function () {
					if (comment.replies.length > 0) {
						return 'Add another reply...';
					}

					return 'Add a reply...';
				}),
				hasFocus: comment.numReplies == 0 || this.clickedReply,
				afterSubmit: function (response) {
					/*if (self.ord() == 'desc') {
						comment.replies.unshift(response.data);
					} else {
						comment.replies.push(response.data);
					}*/
					comment.replies.push(response.data);

					//self.replyingTo(false);

					/*var topic = 'numReplies' + self.reply_id();
					ko.postbox.publish(topic, response.data.total);*/
				},
				afterCancel: function () {
					//self.replyingTo(false);
				}
			};
			//console.log(params);
			return params;
		}
	},
	mounted() {
	}
}
</script>

<style scoped>

</style>