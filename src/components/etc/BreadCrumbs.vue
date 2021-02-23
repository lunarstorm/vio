<template>
	<ul class="breadcrumb breadcrumb-top">
		<li v-if="showHome">
			<router-link to="/">
				Home
			</router-link>
		</li>
		<li v-for="crumb in crumbs">
			<router-link :to="crumb.to">
				{{ crumb.text }}
			</router-link>
		</li>
	</ul>
</template>

<script>
import {ref, watchEffect} from 'vue';

export default {
	name: "BreadCrumbs",
	props: {
		home: Boolean,
		baseTitle: {
			type: String,
			default: ''
		}
	},
	components: {},
	setup(props) {
		const baseTitle = document.title;

		return {
			baseTitle: ref(props.baseTitle),
			showHome: ref(props.home),
		}
	},
	beforeMount(){
		watchEffect(() => {
			document.title = this.title;
		});
	},
	mounted() {
		//console.log(this.crumbs);
	},
	computed: {
		title(){
			let pathReversed = this.crumbs.slice().reverse();
			let tokens = pathReversed.map(item => item.text);

			if(this.baseTitle){
				tokens.push(this.baseTitle);
			}

			let title = tokens.join(' | ');
			return title;
		},
		crumbs() {
			let pathArray = this.$route.path.split("/")
			pathArray.shift()

			let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
				let match = this.$route.matched[idx];

				if (match && path) {
					breadcrumbArray.push({
						path: path,
						to: breadcrumbArray[idx - 1]
						  ? "/" + breadcrumbArray[idx - 1].path + "/" + path
						  : "/" + path,
						text: match.meta.breadCrumb || path,
					});
				}

				return breadcrumbArray;
			}, [])

			return breadcrumbs;
		}
	},
	methods: {}
}
</script>

<style scoped>

</style>