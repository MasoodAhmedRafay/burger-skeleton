<template>
  <!-- Note in this component that it is using another component -->
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{uiLabels.orderNumber}} {{orderId}}</h5>
        <h6 class="card-subtitle">
          <span v-if="eatIn === 1 ">{{uiLabels.eatIn}}</span> 
          <span v-if="eatIn === 0 ">{{uiLabels.takeAway}}</span>
        </h6>
        <p class="card-text">
          <OrderItem
            v-for="(item, key) in order"
            :ui-labels="uiLabels"
            :lang="lang"
            :key="key"
            :order-id="orderId"
            :eat-in="eatIn"
            :order="item" class="row align-center">
          </OrderItem>
        </p>
        <div class="text-center">
          <a href="#" class="btn btn-success" v-on:click="orderDone">{{uiLabels.ready}}</a>
        </div>
      </div>
    </div>
  </div>  
  
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'OrderItemToPrepare',
  components: { OrderItem },
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String,
    eatIn: Number
  },
  methods: {
    orderDone: function () {
      // sending 'done' message to parent component or view so that it
      // can catch it with v-on:done in the component declaration
      this.$emit('done');
    },
    cancelOrder: function () {
      // not implemented
    }
  }
}
</script>
<style scoped>
  .donebutton{
    padding-left: 6%;
  }
  .ingr-item{
    padding-left:10%;
  }
  .card{
      border: 1px solid rgba(0,0,0,.125);
      margin: 5px;
    }
  p{
    font-size: 12pt;
  }
  .btn-success {
    color: #fff !important;
    background-color: #218838 !important;
    border-color: #1e7e34 !important;
  }
  .btn-success,
  .btn-success:hover {
    color: #fff;
    background-color: #218838;
    border-color: #1e7e34;
  }
  /*.btn-success:active {
    background-color: green !important;
    border-color: none !important;
    color: #ffffff !important;
  }*/

  .btn {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
	
</style>