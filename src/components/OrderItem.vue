<template>
	<div class="row">
		<div class="col-md-12">
			<div v-for="item in order.order.ingredients">
				{{item["ingredient_"+ lang]}}
			</div>
		</div>

	</div>
</template>
<script>
export default {
  name: 'OrderItem',
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String,
    eatIn: Number
  }
}
</script>
<style scoped>
</style>