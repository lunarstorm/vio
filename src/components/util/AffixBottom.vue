<template>
	<div ref="container">
		<template v-if="teleportTo">
			<teleport
			  :to="teleportTo"
			  :disabled="!teleportTo"
			  ref="teleported"
			>
				<div class="modal-footer">
					<div class="w-100">
						<slot></slot>
					</div>
				</div>
			</teleport>
		</template>
		<div v-else>
			<div class="affix-container">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery';
import Ui from 'vio/Ui';
import {ref} from 'vue';
import _ from 'lodash';

export default {
	name: "AffixBottom",
	props: {
		parent: {
			type: [String, Object],
			default: '#page-content'
		}
	},
	setup(props) {
		return {
			teleportTo: ref(false),
			listener: null
		}
	},
	mounted() {
		let affixTo = this.parent;

		this.$nextTick(() => {
			if (this.inModal()) {
				affixTo = this.findModalContainer();
				this.teleportTo = this.findModalFooter();

				this.$nextTick(() => {
					this.handleFormElements();
				});
			} else {
				this.listener = Ui.affixBottom(this.$refs.container, affixTo);
			}
		});
	},
	unmounted() {
		if (this.listener) {
			this.listener.dispose();
		}
	},
	computed: {},
	methods: {
		inModal() {
			return (window.$Modal && window.$Modal.isOpen) || window._modalIsOpen;
		},
		findModalFooter() {
			let $container = $(this.$refs.container);

			// Find the closest modal
			let $modal = $container.closest('.vio-modal');

			let $footer = $modal.find('.vio-modal-footer')[0];

			return $footer;
		},
		findModalContainer() {
			let $container = $(this.$refs.container);
			let $modal = $container.closest('.vio-modal');
			let $parent = $modal.find('.vio-modal-parent')[0];
			return $parent;
		},
		handleFormElements() {
			let $container = $(this.$refs.container);
			let $modal = $container.closest('.vio-modal');
			let $form = $container.closest('form');

			if ($form.length > 0) {
				let formId = $form.attr('id');

				if (!formId) {
					formId = _.uniqueId('form');
					$form.attr('id', formId);
				}

				if ($modal) {
					let $submit = $modal.find('*[type=submit]');
					$submit.attr('form', formId);
				}
			}
		}
	}
}
</script>

<style scoped>
.affix-container {
	background: #fff;
	position: relative;
}
</style>