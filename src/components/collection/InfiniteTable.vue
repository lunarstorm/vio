<template>
	<div class="table-responsive">
		<table class="table w-100">
			<slot
			  name="head"
			  :items="items"
			></slot>
			<tbody>
			<template
			  v-for="(item, i) in items"
			  :key="i"
			  :ref="el => { if (el) divs[i] = el }"
			>
				<slot
				  name="item"
				  :item="item"
				  :items="items"
				  :index="i"
				  :num="i+1"
				></slot>
			</template>
			</tbody>
		</table>
	</div>
</template>

<script>
import InfiniteList from "./InfiniteList";

export default {
	...InfiniteList,
	name: "InfiniteTable",
}
</script>

<style scoped>

</style>