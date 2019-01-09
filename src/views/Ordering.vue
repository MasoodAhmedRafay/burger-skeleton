<template onload="document.refresh();">
  <div>
    <!--Choose your ingredient text section-->
  <section class="header5 cid-rdokJKPrV4 mbr-fullscreen mbr-parallax-background" id="header5-m">



    <div class="mbr-overlay" style="opacity: 0.6; background-color: rgb(0, 0, 0);">
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="mbr-white col-md-10">
          <h1 class="mbr-section-title align-center pb-3 mbr-fonts-style display-1">{{uiLabels.customize}}</h1>
          <p class="mbr-text align-center display-5 pb-3 mbr-fonts-style">
            {{uiLabels.choose}}</p>

        </div>
      </div>
    </div>

    <div class="mbr-arrow hidden-sm-down" aria-hidden="true">
      <a href="#header5-r">
        <i class="mbri-down mbr-iconfont"></i>
      </a>
    </div>
  </section>
    <!--List of ingredients section-->
  <section class="header5 cid-rdLXviWWKe mbr-fullscreen" id="header5-r">
    <div class="container">
      <div class="row justify-content-center">
        <div class="mbr-white col-md-12">
          <div id="ordering" class="container">
            <h1>{{ uiLabels.ingredients }}</h1>
            <div class="ing-grid">
              <Ingredient
                      ref="ingredient"
                      v-for="item in ingredients"
                      v-on:increment="addToOrder(item)"
                      v-on:decrement="removeFromOrder(item)"
                      :item="item"
                      :lang="getLang(uiLabels.language)"
                      :key="item.ingredient_id">
              </Ingredient>
            </div>
          </div>
        </div>
      </div>
      <div class="mbr-arrow hidden-sm-down" aria-hidden="true">
        <a href="#tabs1-w">
          <i class="mbri-down mbr-iconfont"></i>
        </a>
      </div>
    </div>
  </section>


    <!--Add to cart and items selected section-->
    <section class="tabs1 cid-re2xcgF2G2 mbr-parallax-background" id="tabs1-w">
      <div class="mbr-overlay" style="opacity: 0.4; background-color: rgb(109, 107, 107);">
      </div>
      <div class="container">
        <h2 class="mbr-white align-center pb-5 mbr-fonts-style mbr-bold display-2">
          {{ uiLabels.myBurger }}
        </h2>
        <div class="media-container-row">
          <div class="col-12 col-md-8">
            <div class="tab-content">
              <div id="tab1" class="tab-pane in active" role="tabpanel">
                <div class="row">
                  <div class="col-md-12">
                    <p class="mbr-text py-5 mbr-fonts-style display-7">
                      <strong>
                        {{ chosenIngredients.map(item => item["ingredient_"+getLang(uiLabels.language)]).join(', ') }}
                      </strong>

                      <br>
                      <strong>
                        <span v-if="chosenIngredients.length != '0'"> {{uiLabels.price}}: {{ price }} kr </span>
                      </strong>
                    </p>
                  </div>
                </div>
              </div>

            </div>
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link mbr-fonts-style active show display-7" aria-selected="true" v-on:click="addToCart()">
                  {{uiLabels.addtoCart}}
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link mbr-fonts-style active show display-7" aria-selected="true" v-on:click="goToCart()">
                  {{uiLabels.cart}}
                </a>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>

//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components
import Ingredient from '@/components/Ingredient.vue'
import OrderItem from '@/components/OrderItem_ordering_cart.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'
import sharedVueStuffClient from '@/components/sharedVueStuffClient.js'

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */

export default {
  name: 'Ordering',
  components: {
    Ingredient,
    OrderItem,
  },
  mixins: [sharedVueStuff, sharedVueStuffClient], // include stuff that is used in both
                        // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      chosenIngredients: [],
      price: 0,
      orderNumber: "",
      ordertocart:''
    }
  },

  created: function () {
    this.$store.state.socket.on('orderNumber', function (data) {
      this.orderNumber = data;
    }.bind(this));
    this.reloadPage();

  },
  computed: function(){
    var i;
    for (i = 0; i < this.$refs.ingredient.length; i += 1) {
      this.$refs.ingredient[i].resetCounter();
    }
  },
  methods: {
    addToOrder: function (item) {
      if(item.stock >= 1){
        this.chosenIngredients.push(item);
        this.price += +item.selling_price;
      }
      else{
        alert(this.uiLabels.maxStock);
      }
    },

    removeFromOrder:function (item) {
        if( this.chosenIngredients.indexOf(item) !== -1 ){
          this.chosenIngredients.splice( this.chosenIngredients.indexOf(item), 1 );
          this.price -= item.selling_price;
        }
    },
    placeOrder: function () {
      var i,
      //Wrap the order in an object
        order = {
          ingredients: this.chosenIngredients,
          price: this.price
        };
      // make use of socket.io's magic to send the stuff to the kitchen via the server (app.js)
      this.$store.state.socket.emit('order', {order: order});
      //set all counters to 0. Notice the use of $refs
      for (i = 0; i < this.$refs.ingredient.length; i += 1) {
        this.$refs.ingredient[i].resetCounter();
      }
      this.price = 0;
      this.chosenIngredients = [];
    },

    addToCart: function(){
        var i,
            //Wrap the order in an object
            order = {
                ingredients: this.chosenIngredients,
                price: this.price,
                quantity: 1,
                stock: this.getItemStock()
            };
        if(this.chosenIngredients.length===0){
            alert(this.uiLabels.noItem);
        }
        else{
          this.newOrder({order: order});
          //set all counters to 0. Notice the use of $refs
          for (i = 0; i < this.$refs.ingredient.length; i += 1) {
              this.$refs.ingredient[i].resetCounter();
          }
          this.price = 0;
          this.chosenIngredients = [];
          alert(this.uiLabels.itemSuccess);
        }
    },
    getItemStock: function(){
        var i, item, min_stock;
        min_stock = Infinity;
        for (i=0;i<this.chosenIngredients.length;i++){
            item = this.chosenIngredients[i];
            if (item.stock < min_stock){
                min_stock = item.stock;
            }

        }
        return min_stock;
    },
    goToCart: function(){
        location.href = "#/cart";
    },
    getLang: function(lang){
        if(lang === "Svenska"){
            return "en";
        }
        else{
            return "sv";
        }
    }
  }
}


</script>
<style scoped>
/* scoped in the style tag means that these rules will only apply to elements, classes and ids in this template and no other templates. */
#ordering {
  margin:auto;
  padding-top: 50px;
  max-width: 100%;
}

.example-panel {
  position: fixed;
  left:0;
  top:0;
  z-index: -2;
}
.ingredient {
  border: 1px solid #ccd;
  padding: 5px;
  width: 14em;
  height: 14em;
  /*background-image: url('~@/assets/exampleImage.jpg');*/
  color: white;
  text-align: center;
}


#head-line {
	padding: 0px 150px 40px;
	font-size: 24pt;
}

.ing-grid{
  display: grid;
  grid-gab: 1em;
  grid-template-columns: repeat(auto-fit, calc(14em + 1px));
}
</style>