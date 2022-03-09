<template>
  <ul class="breadcrumb m-2">
    <li v-for="crumb in crumbs" :key="crumb.title" class="breadcrumb-item">
      <inertia-link :href="crumb.url">
        {{ crumb.title }}
      </inertia-link>
    </li>
  </ul>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
  name: "BreadCrumbs",
  props: {
    home: Boolean,
    baseTitle: {
      type: String,
      default: "",
    },
    crumbs: Array,
  },
  components: {},
  setup(props) {
    const baseTitle = document.title;

    return {
      baseTitle: ref(props.baseTitle),
      showHome: ref(props.home),
    };
  },
  beforeMount() {
    watchEffect(() => {
      //document.title = this.title;
    });
  },
  mounted() {
    //console.log(this.crumbs);
  },
  computed: {
    title() {
      /*let pathReversed = this.crumbs.slice().reverse();
			let tokens = pathReversed.map(item => item.text);

			if(this.baseTitle){
				tokens.push(this.baseTitle);
			}

			let title = tokens.join(' | ');
			return title;*/
    },
  },
  methods: {},
};
</script>

<style scoped>
</style>
