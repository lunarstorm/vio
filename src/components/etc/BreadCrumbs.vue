<template>
  <ol class="breadcrumb">
    <li v-if="showHome" class="breadcrumb-item">
      <router-link to="/">
        Home
      </router-link>
    </li>
    <li v-for="crumb in crumbs" class="breadcrumb-item">
      <router-link :to="crumb.to">
        {{ crumb.text }}
      </router-link>
    </li>
  </ol>
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
            let pathReversed = this.crumbs.slice().reverse();
            let tokens = pathReversed.map((item) => item.text);

            if (this.baseTitle) {
                tokens.push(this.baseTitle);
            }

            let title = tokens.join(' | ');
            return title;
        },
        crumbs() {
            let pathArray = this.$route.path.split('/');
            pathArray.shift();

            let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
                let match = this.$route.matched[idx];

                if (match && path) {
                    breadcrumbArray.push({
                        path: path,
                        to: breadcrumbArray[idx - 1]
                            ? '/' + breadcrumbArray[idx - 1].path + '/' + path
                            : '/' + path,
                        text: match.meta.breadCrumb || path,
                    });
                }

                return breadcrumbArray;
            }, []);

            return breadcrumbs;
        },
    },
    beforeMount() {
        watchEffect(() => {
            document.title = this.title;
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
