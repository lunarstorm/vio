<template>
  <div>
    <div v-if="isNotLong">
      <div v-html="textFull" />
    </div>
    <div v-else-if="expanded">
      <div v-html="textFull" />
      <div class="form-group">
        <a href="#" @click.prevent="toggle">
          <i class="fa fa-caret-up text-faint mr-1" />
          <strong>Show Less</strong>
        </a>
      </div>
    </div>
    <div v-else>
      <span v-html="textShort" />&nbsp;
      <a href="#" @click.prevent="toggle">
        <i class="fa fa-caret-right text-faint mr-1" />
        <strong>Show More</strong>
      </a>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from 'vue';

export default {
    name: 'TextLong',
    props: {
        expanded: {
            type: Boolean,
            default: false,
        },
        maxChars: {
            type: Number,
            default: 100,
        },
        text: String,
    },
    setup(props) {
        return {
            maxChars: ref(props.maxChars),
            expanded: ref(props.expanded),
            text: toRefs(props).text,
        };
    },
    computed: {
        length() {
            return this.text ? this.text.length : 0;
        },
        isNotLong() {
            return !this.isTooLong;
        },
        isTooLong() {
            return this.maxChars < this.length;
        },
        textShort() {
            if (this.isTooLong) {
                let shortened = this.text.slice(0, this.maxChars).trim() + '...';
                return this.nl2br(shortened);
            }

            return this.textFull;
        },
        textFull() {
            return this.nl2br(this.text);
        },
    },
    methods: {
        toggle() {
            this.expanded = !this.expanded;
            return false;
        },
        nl2br(text) {
            return text ? text.replace(/\n/g, '<br />') : '';
        },
    },
};
</script>

<style scoped>
</style>
