<template>
  <div
    ref="container"
    class="list-unstyled"
  >
    <div v-if="params.ord == 'desc' && !params.commentId">
      <div v-if="params.showForm && formParams">
        <comment-form
          :params="formParams"
          @comment-submitted="insertComment"
        />
      </div>
      <div v-else>
        <a
          href="#"
          class="btn btn-sm btn-link"
          @click.prevent="toggleForm"
        >
          Reply
        </a>
      </div>
    </div>

    <div
      v-if="hasPrev"
      class="small p-2"
    >
      <span class="text-muted">&mdash;</span>
      <a
        href="#"
        class="text-muted"
        @click.prevent="prev"
      >
        Show Previous {{ noun }}
        <span v-if="nCommentsUnshown > 0">({{ nCommentsUnshown }})</span>
      </a>
    </div>

    <div v-if="params.totalKnown > 0 && busyLoading" class="p-2 text-center small">
      <spinner class="text-muted" />
    </div>

    <comment-item
      v-for="comment in comments"
      :key="comment.id"
      :comment-data="comment"
      :params="{id: comment.id}"
      :can-reply="params.canReply"
      :show-replies="params.showReplies && comment.numReplies > 0"
      @destroyed="removeComment"
    />

    <div
      v-if="hasNext"
      class="text-center mb-3"
    >
      <a
        href="#"
        class="btn btn-xs btn-secondary"
        @click.prevent="next"
      >
        Show more...
      </a>
    </div>

    <div v-if="params.ord == 'asc' && !params.commentId">
      <div v-if="params.showForm">
        <comment-form
          :params="formParams"
          @comment-submitted="insertComment"
        />
      </div>
      <div v-else>
        <a
          href="#"
          class="btn btn-sm btn-link"
          @click.prevent="toggleForm"
        >
          Reply
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {
    defineAsyncComponent,
    reactive,
    ref,
    toRefs,
    provide,
} from 'vue';
import _ from 'lodash';
import io from 'io/app';
import api from 'vio/Api';
import $ from 'jquery';
import Spinner from 'vio/components/spinner/Spinner';

const CommentForm = defineAsyncComponent(() => import('./CommentForm.vue'));
const CommentItem = defineAsyncComponent(() => import('./CommentItem.vue'));

export default {
    name: 'CommentThread',
    components: {
        CommentForm,
        CommentItem,
        Spinner,
    },
    props: {
        params: Object,
        hasFocus: Boolean,
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
            initials: io.data.user ? io.data.user.initials : 'NA',
            replyingTo: false,
            canReply: true,
            totalKnown: 0,
        };

        const params = reactive({
            ...defaults,
            ...props.params,
        });

        //console.log('CommentThread props', propRefs.params);

        const comments = reactive([]);
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
            },
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
        };
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
    },
    watch: {
        busyLoading: function (val) {
            console.log('Watch busyLoading', val);
        },
    },
    created() {
        this.fetch({
            type: this.params.ord == 'asc' ? 'prepend' : 'append',
            id: this.params.commentId,
            parent: this.params.parent,
        });
    },
    methods: {
        next() {
            if (this.hasNext) {
                this.page++;
                this.fetch({
                    type: 'append',
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
                    ref: id,
                });
            }

            return false;
        },
        fetch(o) {
            var self = this;
            o = $.extend({
                id: null,
                parent: null,
                type: 'append',
                limit: self.params.limit,
                ref: null,
            }, o);

            var data = {
                obj: self.params.obj,
                oid: self.params.oid,
                p: self.page,
                l: o.limit,
                ref: o.ref,
                ord: self.params.ord,
                parent: self.params.parent,
            };

            if (data.ref) {
                data.p = null;
            }

            if (o.id) {
                data['id'] = o.id;
            }

            //self.busyLoading = true;

            return api.get('comments', {
                data: data,
                busyFlag: self.busyLoading,
            }).done(function (response) {
                response.data.items.map(function (item) {
                    if (o.type == 'append') {
                        self.comments.push(item);
                    } else {
                        self.comments.unshift(item);
                    }
                });

                /*$.each(response.data.items, function (i, item) {

				});*/

                self.total = response.data.total;
                self.hasNext = response.data.hasNext;
                self.hasPrev = response.data.hasPrev;
            }).always(function () {
                //self.busyLoading = false;
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
        },
    },
};
</script>

<style scoped>

</style>