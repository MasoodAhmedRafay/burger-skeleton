<template>
  <div class="ingredient">
    <label>
      {{item["ingredient_"+ lang]}}
      <br>
      <span v-if="lang == 'en'">Price</span><span v-if="lang == 'sv'">Pris</span>:
      {{item.selling_price}}:-
      <br>
      <br>
      <button class="btn-warning btn-xs" v-on:click="decrementCounter()"> - </button>
      {{ counter }}
      <button class="btn-warning btn-xs" v-on:click="incrementCounter(item.stock)" > + </button>
      <br>
      <br>
      <img :src="require('../assets/'+ item.image)" width="100em" height="80em">
    </label>
  </div>
</template>
<script>
export default {
  name: 'Ingredient',
  props: {
    item: Object,
    lang: String
  },
    data: function () {
    return {
      counter: 0
    };
  },
  methods: {
    incrementCounter: function (stock) {
      if(stock >0 && this.counter < stock){
        this.counter += 1;

        // sending 'increment' message to parent component or view so that it
        // can catch it with v-on:increment in the component declaration
        this.$emit('increment');
      }
      else{
        alert("Sorry, not enough in stock :(");
      }
    },

    decrementCounter: function () {
      if(this.counter >0){
        this.counter -= 1;
      }

      // sending 'increment' message to parent component or view so that it
      // can catch it with v-on:increment in the component declaration
      this.$emit('decrement');
    },

    resetCounter: function () {
      this.counter = 0;
    },

    getCounter:function () {
      return this.counter;
    }
  }
}
</script>
<style scoped>

</style>