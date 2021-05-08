<template>
	<div
	  ref="toast"
	  class="toast fade hide"
	  role="alert"
	  aria-live="assertive"
	  aria-atomic="true"
	  :data-delay="delay"
	  style="min-width: 250px;"
	  :class="classes.main"
	>
		<div
		  v-if="item.title"
		  class="toast-header"
		>
			<div class="d-flex align-items-center w-100">
				<i
				  class="fa fa-square mr-1"
				  :class="'text-'+item.level"
				></i>
				<strong
				  class="mr-auto"
				  :class="'text-'+item.level"
				>
					{{ item.title || title }}
				</strong>
				<button
				  type="button"
				  class="ml-auto mb-1 close"
				  data-dismiss="toast"
				  aria-label="Close"
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		</div>
		<div class="toast-body d-flex align-items-center">
			<div>
				{{ item.message }}
			</div>
			<button
			  type="button"
			  class="ml-auto my-0 close"
			  data-dismiss="toast"
			  aria-label="Close"
			>
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "Toast",
	props: {
		item: Object,
		delay: {
			type: [Number],
			default: 3000
		}
	},
	mounted() {
		let $toast = $(this.$refs.toast);
		//$toast.toast({});
		$toast.toast('show');
		//console.log('Toasted', this.item);
	},
	computed: {
		title() {
			switch (this.item.level) {
				case 'warning':
					return 'Warning';
			}

			return 'Notice';
		},
		classes() {
			let classes = {
				main: [],
				header: []
			};

			let item = this.item;

			if (item.level) {
				classes.main.push('bg-' + item.level);
				//classes.header.push('bg-' + item.level);

				switch (item.level) {
					case 'warning':
						classes.main.push('text-dark');
						break;
					case 'success':
					default:
						classes.main.push('text-white');
						classes.header.push('text-white');
				}
			}

			return classes;
		}
	}
}
</script>

<style scoped>

</style>