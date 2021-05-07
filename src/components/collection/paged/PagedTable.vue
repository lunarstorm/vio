<template>
	<div class="card">
		<div class="card-header">
			<div class="d-flex align-items-center">
				<div class="text-muted mr-auto">
					<template v-if="page.total > 0">
						Showing
						<text-numeric :value="page.from"></text-numeric>
						to
						<text-numeric :value="page.to"></text-numeric>
						of
						<text-numeric :value="page.total"></text-numeric>
					</template>
					<template v-else>
						No items
					</template>
				</div>
				<div>
					<paginator v-if="page.total > 0" :page="page"></paginator>
				</div>
			</div>
		</div>
		<div class="table-responsive">
			<table class="table">
				<template v-if="page.data && page.data.length > 0">
					<slot
					  name="head"
					  :page="page"
					></slot>
					<tbody>
					<template
					  v-for="(item, index) in page.data"
					  :key="item.id"
					>
						<slot
						  name="row"
						  :item="item"
						  :index="index"
						  :items="page.data"
						></slot>
					</template>
					</tbody>
				</template>
				<tbody v-else>
				<tr>
					<td class="p-4 text-center text-muted">
						No Items
					</td>
				</tr>
				</tbody>
			</table>
		</div>
		<div class="card-footer">
			<div class="card-footer-content">
				<div class="d-flex align-items-center">
					<div class="align-middle text-muted">
						Page
						<text-numeric :value="page.current_page"></text-numeric>
						of
						<text-numeric :value="page.last_page"></text-numeric>
					</div>
					<div class="ml-auto">
						<paginator v-if="page.total > 0" :page="page"></paginator>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Paginator from "vio/components/collection/paged/Paginator";
import TextNumeric from "vio/components/text/TextNumeric";

export default {
	name: "PagedTable",
	components: {
		Paginator,
		TextNumeric
	},
	props: {
		page: Object
	}
}
</script>

<style scoped>

</style>