<template>
	<div ref="container">
		<div class="media p-2 mb-0 rounded shadow-sm bg-light">
			<div
			  :style="params.avatar.css"
			  class="align-self-start text-center rounded-circle shadow-sm p-2"
			>
				<strong>
					{{ params.avatar.initials }}
				</strong>
			</div>
			<div class="media-body mx-3">
				<form
				  @submit.prevent="submit"
				  method="POST"
				>
					<textarea
					  v-model="params.body"
					  :placeholder="params.placeholder"
					  v-autosize
					  ref="inputField"
					  rows="1"
					  class="form-control"
					></textarea>

					<div v-if="params.body.length > 0"
					  class="form-group mt-2 mb-0"
					>
						<button
						  type="submit"
						  class="btn btn-primary"
						>
							<i v-if="busy" class="fa fa-refresh fa-spin text-faint"></i>
							Post
						</button>
						<button
						  @click="reset"
						  type="button"
						  class="btn btn-link text-muted"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import io from 'io/app';
import api from 'io/api';
import autosize from 'vio/directives/autosize';
import $ from 'jquery';
import {reactive, watch, toRefs, ref} from "vue";

export default {
	name: "CommentForm",
	components: {},
	directives: {
		autosize
	},
	emits: ['commentSubmitted'],
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
			body: '',
			commentId: null,
			toggle: true,
			hasFocus: false,
			afterSubmit: false,
			afterCancel: false,
			placeholder: 'Say something...',
			initials: io.data.user.initials,
			avatar: {
				initials: io.data.user.initials,
				css: $.extend({
					width: '40px',
					height: '40px'
				}, io.data.user.avatar)
			}
		};

		const params = reactive({
			...defaults,
			...props.params
		});

		//console.log('comment form', params);

		return {
			params,
			busy: ref(false)
		}
	},
	methods: {
		reset() {
			this.params.body = '';
			this.$refs.inputField.innerHTML = '';
		},
		onInput(e) {
			this.params.body = e.target.innerHTML;
			//console.log(e.target.innerHTML);
		},
		submit() {
			let self = this;

			this.busy = true;

			return io.api.post('comments', {
				_json: {
					obj: self.params.obj,
					oid: self.params.oid,
					body: self.params.body,
					reply_id: self.params.reply_id
				},
				//busyFlag: self.busy.submitting
			}).done(function (response) {
				if (response.status == 'success') {
					self.reset();
					self.$emit('commentSubmitted', response.data);
				}

				/*if (ko.isObservable(data.toggle)) {
					data.toggle(false);
				}*/

				if (typeof self.params.afterSubmit === 'function') {
					self.params.afterSubmit(response);
				}

				this.busy = false;
			});
		}
	},
	computed: {
		placeholder() {
			if (this.params.reply_id) {
				return 'Add a reply...';
			}

			return 'Say something...';
		},
		observedInput() {
			if (this.params.body == '') {
				this.$refs.inputField.innerHTML = '';
			}

			return this.params.body;
		}
	},
	mounted() {
		/*let tribute = new Tribute({
			lookup: 'name',
			values: function (text, callback) {
				//console.log('Lookup', text);
				api.get('users', {
					data: {
						q: text
					}
				}).done(function (response) {
					if (response.status == 'success') {
						//console.log(response.data.users);
						callback(response.data.users);
					}
				});
			},
			selectTemplate: function (item) {
				//console.log(item);
				return `<span class="tag-mention" contenteditable="false" data-token="${item.original.tag.token}">${item.original.name}</span>`;
			},
			onReplaced: function (e) {
				//console.log(e);
				$(e.detail.instance.element).trigger('input');
			}
		});

		tribute.attach(this.$refs.inputField);*/

		if (this.params.hasFocus) {
			this.$refs.inputField.focus();
		}
	}
}
</script>

<style scoped>

</style>