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
import { ref, watchEffect } from 'vue';

export default {
    name: 'BreadCrumbs',
    components: {},
    props: {
        home: Boolean,
        baseTitle: {
            type: String,
            default: '',
        },
        crumbs: Array,
    },
    setup(props) {
        const baseTitle = document.title;

        return {
            baseTitle: ref(props.baseTitle),
            showHome: ref(props.home),
        };
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
    beforeMount() {
        watchEffect(() => {
            //document.title = this.title;
        });
    },
    mounted() {
    //console.log(this.crumbs);
    },
    methods: {},
};
</script>

<style scoped>
</style>
