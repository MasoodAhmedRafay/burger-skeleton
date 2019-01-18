<template>
	<div>

		<!--{{orderId}} {{order.type}} {{uiLabels.ingredients}}:-->
		<!--{{order.order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}-->
		{{orderId}}
	</div>
</template>
<script>
export default {
  name: 'OrderItem',
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String
  }
}
</script>
<style scoped>
	
</style>