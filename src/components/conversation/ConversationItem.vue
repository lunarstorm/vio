<template>
  <div ref="container">
    <div class="conversation-inbound">
      <div class="conversation-avatar">
        <Avatar :style="comment.avatar">
          {{ comment.initials }}
        </Avatar>
      </div>
      <div class="conversation-message">
        <div class="conversation-meta">
          <strong class="ml-1">{{ comment.author }}</strong>
          <span class="time ml-1">
            <TextTimeAgo
              v-if="comment.isWithinCutoff"
              :value="comment.date"
            />
            <span v-else>{{ comment.date_string }}</span>
          </span>
        </div>
        <div class="conversation-message-text">
          <div v-if="isEdit">
            <form method="POST" @submit.prevent="save">
              <InputTextarea v-model="comment.body" rows="1" />

              <div class="mt-2">
                <button
                  :disable="isSaving"
                  type="submit"
                  class="btn btn-primary"
                >
                  <i v-if="isSaving" class="fa fa-refresh fa-spin mr-1" />
                  Save
                </button>

                <button
                  type="button"
                  class="btn btn-link"
                  @click="isEdit = false"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <div v-else>
            <div v-html="comment.body_html" />
          </div>
        </div>

        <div class="conversation-meta">
          <template v-if="canReply">
            <a
              v-if="comment.numReplies > 0"
              href="#"
              class="btn-sm btn-link font-weight-bold pl-0"
              @click.prevent="toggleReplies"
            >
              <template v-if="showReplies">
                <i class="fa fa-caret-down" />
                Replies
              </template>
              <template v-else>
                <i class="fa fa-caret-right" />
                Replies ({{ comment.numReplies }})
              </template>
            </a>
            <a
              v-if="comment.numReplies == 0"
              href="#"
              class="btn-sm btn-link pl-0"
              @click.prevent="toggleReply"
            >
              Reply
            </a>
          </template>
          <template v-if="!isEdit && comment.canEdit">
            &middot;
            <a href="#" class="text-muted" @click.prevent="isEdit = true">
              Edit
            </a>
            &middot;
            <a href="#" class="text-muted" @click.prevent="del"> Delete </a>
          </template>
        </div>

        <div v-if="showReplies">
          <CommentReplies v-bind="replyThreadParams" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import CommentReplies from './ConversationThread';
import InputTextarea from '../form/InputTextarea';
import Avatar from 'vio/components/comment/Avatar';
import TextTimeAgo from 'vio/components/text/TextTimeAgo';

export default {
    name: 'ConversationItem',
    components: {
        TextTimeAgo,
        CommentReplies,
        InputTextarea,
        Avatar,
    },
    props: {
        params: Object,
        commentData: Object,
        canReply: Boolean,
        showReplies: Boolean,
        numReplies: Number,
    },
    emits: ['destroyed'],
    setup(props) {
        let comment = reactive(props.commentData);
        const isEdit = ref(false);

        //console.log(comment.body, comment.numReplies);

        return {
            comment,
            isEdit,
            isSaving: ref(false),
            clickedReply: ref(false),
        };
    },
    computed: {
        replyThreadParams() {
            let comment = this.comment;
            let replyId = comment.reply_id ? comment.reply_id : comment.id;
            var showForm = comment.numReplies == 0;

            var params = {
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
                },
            };

            //console.log(params);
            return {
                params: params,
                topic: comment.obj,
                topicId: comment.oid,
            };
        },
    },
    mounted() {},
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

            return this.$http
                .post('/comments', {
                    id: comment.id,
                    data: {
                        _json: JSON.stringify(comment),
                    },
                })
                .done(function (response) {
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
            return this.$http
                .post('/comments/delete', {
                    id: commentId,
                })
                .done(function (response) {
                    self.$emit('destroyed', commentId);
                });
        },
    },
};
</script>

<style scoped>
</style>
