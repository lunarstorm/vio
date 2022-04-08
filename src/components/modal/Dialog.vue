<template>
  <div
    ref="modal"
    class="modal"
  >
    <div
      class="modal-dialog"
      :class="classes"
    >
      <div class="modal-content">
        <div
          class="modal-header"
        >
          <h5 class="modal-title">
            {{ title || '' }}
          </h5>
        </div>
        <div class="modal-body">
          <div v-html="message" />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-primary"
            :class="classYesButton"
            @click.prevent="doYes"
          >
            {{ yesLabel }}
          </button>
          <button
            type="button"
            class="btn btn-light"
            @click.prevent="close"
          >
            {{ noLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Dialog',
    props: {
        title: String,
        message: String,
        level: {
            type: String,
            default: 'info',
        },
        yesLabel: {
            type: String,
            default: 'Yes',
        },
        noLabel: {
            type: String,
            default: 'Cancel',
        },
        onYes: {
            type: Function,
            default: () => {
                return false;
            },
        },
        center: Boolean,
    },
    computed: {
        classes() {
            let items = [];

            if (this.center) {
                items.push('modal-dialog-centered');
            }
            //items.push()

            return items;
        },
        classHeader() {
            let items = [
                'bg-' + this.level,
            ];

            switch (this.level) {
            case 'info':
            case 'danger':
                items.push('text-light');
                break;
            }

            return items;
        },
        classYesButton() {
            switch (this.level) {
            default:
                return 'btn-' + this.level;
                break;
            }

            return 'btn-primary';
        },
    },
    mounted() {
        let $modal = $(this.$refs.modal);
        $modal.modal();
    },
    methods: {
        doYes() {
            if (this.onYes) {
                this.onYes();
            }
            this.close();
        },
        close() {
            let $modal = $(this.$refs.modal);
            $modal.modal('hide');
        },
    },
};
</script>

<style scoped>

</style>