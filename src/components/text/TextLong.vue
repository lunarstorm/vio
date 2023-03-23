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

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    expanded: {
        type: Boolean,
        default: false,
    },
    maxChars: {
        type: Number,
        default: 100,
    },
    text: String,
});

const expanded = ref(props.expanded);
const maxChars = ref(props.maxChars);

const length = computed(() => props.text ? props.text.length : 0);
const isNotLong = computed(() => !isTooLong.value);
const isTooLong = computed(() => maxChars.value < length.value);

const textShort = computed(() => {
    if (isTooLong.value) {
        let shortened = props.text.slice(0, maxChars.value).trim() + '...';
        return nl2br(shortened);
    }
    return textFull.value;
});

const textFull = computed(() => {
    return nl2br(props.text);
});

function toggle() {
    expanded.value = !expanded.value;
    return false;
}

function nl2br(text) {
    return text ? text.replace(/\n/g, '<br />') : '';
}
</script>
 
