<template>
  <div ref="container">
    <div class="conversation-inbound">
      <div class="conversation-avatar">
        <avatar :style="comment.avatar">
          {{ comment.initials }}
        </avatar>
      </div>
      <div class="conversation-message">
        <div class="conversation-meta">
          <strong class="ml-1">{{ comment.author }}</strong>
          <span class="time ml-1">
            <text-time-ago
              v-if="comment.isWithinCutoff"
              :value="comment.date"
            ></text-time-ago>
            <span v-else>{{ comment.date_string }}</span>
          </span>
        </div>
        <div class="conversation-message-text">
          <div v-if="isEdit">
            <form @submit.prevent="save" method="POST">
              <input-textarea v-model="comment.body" rows="1"></input-textarea>

              <div class="mt-2">
                <button
                  :disable="isSaving"
                  type="submit"
                  class="btn btn-primary"
                >
                  <i v-if="isSaving" class="fa fa-refresh fa-spin mr-1"></i>
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
            <div v-html="comment.body_html"></div>
          </div>
        </div>

        <div class="conversation-meta">
          <template v-if="canReply">
            <a
              v-if="comment.numReplies > 0"
              @click.prevent="toggleReplies"
              href="#"
              class="btn-sm btn-link font-weight-bold pl-0"
            >
              <template v-if="showReplies">
                <i class="fa fa-caret-down"></i>
                Replies
              </template>
              <template v-else>
                <i class="fa fa-caret-right"></i>
                Replies ({{ comment.numReplies }})
              </template>
            </a>
            <a
              v-if="comment.numReplies == 0"
              @click.prevent="toggleReply"
              href="#"
              class="btn-sm btn-link pl-0"
            >
              Reply
            </a>
          </template>
          <template v-if="!isEdit && comment.canEdit">
            &middot;
            <a @click.prevent="isEdit = true" href="#" class="text-muted">
              Edit
            </a>
            &middot;
            <a @click.prevent="del" href="#" class="text-muted"> Delete </a>
          </template>
        </div>

        <div v-if="showReplies">
          <comment-replies v-bind="replyThreadParams"></comment-replies>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import CommentReplies from "./ConversationThread";
import InputTextarea from "../form/InputTextarea";
import Avatar from "vio/components/comment/Avatar";
import TextTimeAgo from "vio/components/text/TextTimeAgo";

export default {
  name: "ConversationItem",
  components: {
    TextTimeAgo,
    CommentReplies,
    InputTextarea,
    Avatar,
  },
  emits: ["destroyed"],
  props: {
    params: Object,
    commentData: Object,
    canReply: Boolean,
    showReplies: Boolean,
    numReplies: Number,
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
      clickedReply: ref(false),
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

      return this.$http
        .post("/comments", {
          id: comment.id,
          data: {
            _json: JSON.stringify(comment),
          },
        })
        .done(function (response) {
          if (response.status == "success") {
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
        .post("/comments/delete", {
          id: commentId,
        })
        .done(function (response) {
          self.$emit("destroyed", commentId);
        });
    },
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
            return "Add another reply...";
          }

          return "Add a reply...";
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
};
</script>

<style scoped>
</style>
