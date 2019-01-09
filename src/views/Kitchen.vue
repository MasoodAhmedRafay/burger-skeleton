<template>
<div id="orders">
  
  <button class="btn btn-" v-on:click="kitchenSwitchLang()">{{uiLabels.language}}</button>
  <br>

  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-8">
        <div class="panel panel-primary">
          <div class="panel-heading">{{ uiLabels.ordersInQueue }}</div>
          <div class="panel-body">
            <div class="row">
              <OrderItemToPrepare
                v-for="(order, key) in orders"
                v-if="order.status !== 'done'"
                v-on:done="markDone(key)"
                :order-id="key"
                :order="order.items"
                :ui-labels="uiLabels"
                :eat-in="order.eatIn"
                :lang="lang"
                :key="key" >
              </OrderItemToPrepare>
            </div>
          </div>
        </div>  
      </div>
      <div class="col-sm-4">
        <div class="panel panel-primary">
          <div class="panel-heading">{{ uiLabels.ordersFinished }}</div>
          <div class="panel-body">
            <div class="table-wrapper-scroll-y">
              <table class="table" width="100%">
                <thead> 
                  <tr> 
                    <th class="nowrap">{{uiLabels.orderNumber}}</th> 
                    <th>{{uiLabels.eatInOrTakeAway}}</th> 
                    <th>{{uiLabels.ingredients}}</th> 
                  </tr> 
                </thead>

                <tr v-for="(order, orderkey) in orders" v-if="order.status === 'done'" :key="orderkey" > 
                  <th scope="row">{{orderkey}}</th> 
                  <td>
                    <span class="nowrap">
                      <span v-if="order.eatIn === 1 ">{{uiLabels.eatIn}}</span>
                      <span v-if="order.eatIn === 0 ">{{uiLabels.takeAway}}</span>
                    </span>
                    
                  </td> 
                  <td>
                    <OrderItem
                      v-for="(item, key) in order.items"
                      :order-id="orderkey"
                      :order="item"
                      :lang="lang"
                      :ui-labels="uiLabels"
                      :eat-in="order.eatIn"
                      :key="key">
                    </OrderItem>
                  </td> 
                </tr>
              </table>
            </div>
          </div>
        </div>  
     </div>
    </div>
  </div>
  <br>
  
</div>	
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare
  },
  mixins: [sharedVueStuff], // include stuff that is used in both 
                            //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
      uiLabels: {},
      lang: 'en'
    }
  },
  created: function(){
      // localStorage.clear();
      this.hideNav();

      if (localStorage.getItem('kitchenlang')){
          this.$store.state.socket.emit('kitchenpageLoaded', JSON.parse(localStorage.getItem('kitchenlang')));
      }
      else{
          this.$store.state.socket.emit('kitchenpageLoaded');
      }

      this.$store.state.socket.on('kitchenLabels', function (data) {
          this.uiLabels = data.uiLabels;
      }.bind(this));
      this.$store.state.socket.on('kitchenSwitchLang', function (data) {
          this.uiLabels=data;
      }.bind(this));
  },
    mounted(){
        if (localStorage.getItem('kitchenlang')) {
            this.lang = JSON.parse(localStorage.getItem('kitchenlang'));
        }
        if (localStorage.getItem('kitchenuiLabels')) {
            this.uiLabels = JSON.parse(localStorage.getItem('kitchenuiLabels'));
        }
    },
    watch:
        {
          lang: {
              handler() {
                  localStorage.setItem('kitchenlang', JSON.stringify(this.lang));

              },
          },
          uiLabels: {
              handler() {
                  localStorage.setItem('kitchenuiLabels', JSON.stringify(this.uiLabels));
              },
          }

        },
  methods: {
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    },
    hideNav: function(){
        var x = document.getElementById("menu1-7");
        var y = document.getElementById("footer1-q");
        x.style.display = "none";
        y.style.display = "none";
    },
    kitchenSwitchLang: function () {
        if (this.lang === "en") {
            this.lang = "sv";
        } else {
            this.lang = "en";
        }
        console.log(this.lang);
        this.$store.state.socket.emit('kitchenSwitchLang', this.lang);
    }
  }
}
</script>
<style scoped>
	#orders {
    font-size:20pt;
  }

  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }
  .grid-header{
    color: black;
    font-size: 25px;
    font-weight: bold;
    border: solid black;
    border-width: 4px 4px 2px 4px;
    padding: 4px;
  }
  .grid-row{
    border: solid 2px black;
    /*padding-top: 10px;*/
    /*padding-bottom: 10px;*/
    padding: 30px 0;
    align-content: center;
  }
  .panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
  }
  .panel-primary {
      border-color: #337ab7;
  }
  .panel-heading {
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .panel-primary>.panel-heading {
    color: #fff;
    background-color: #337ab7;
    border-color: #337ab7;
}
  .panel-body {
    padding: 15px;
  }.
  /*.table-responsive{
    overflow-x: hidden !important;
    overflow-y: auto !important;
  }*/
  .table-wrapper-scroll-y {
    display: block;
    max-height: 200px;
    overflow-y: auto;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
  thead{
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
  }
  tr{
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
  }
  .nowrap {
    white-space:nowrap;
  }

</style>