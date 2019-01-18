<template>
  <div>
    <!--Choose your ingredient text section-->
  <section class="header5 cid-reCGRbRPd8 mbr-fullscreen mbr-parallax-background" id="header5-10">
    <div class="mbr-overlay" style="opacity: 0.6; background-color: rgb(0, 0, 0);">
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="mbr-white col-md-10">
          <h1 class="mbr-section-title align-center pb-3 mbr-fonts-style display-1">{{uiLabels.setMenu}}</h1>
          <p class="mbr-text align-center display-5 pb-3 mbr-fonts-style">
            {{uiLabels.chooseSetMenu}}</p>

        </div>
      </div>
    </div>

    <div class="mbr-arrow hidden-sm-down" aria-hidden="true">
      <a href="#header5-t">
        <i class="mbri-down mbr-iconfont"></i>
      </a>
    </div>
  </section>
    <!--List of ingredients section-->
  <section class="header5 cid-rdLXviWWKe mbr-fullscreen" id="header5-t">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="mbr-white col-md-12 justify-content-center">
          <div id="ordering-ready-made" class="container">
            <div v-for="i in 5" :key="i" v-bind:id="'category'+i+6">
              <h3 class="mbr-white pb-3 mbr-fonts-style mbr-bold display-2 category" v-if="categories.hasOwnProperty(i+5)">
                {{categories[i+5]["category_"+getLang(uiLabels.language)]}}
              </h3>
              <div class="ing-grid">

                <SetMenuItem
                        ref="item"
                        v-for="item in setMenuItems"
                        v-if="item.category == i+6"
                        v-on:increment="addToOrder(item)"
                        v-on:decrement="removeFromOrder(item)"
                        :item="item"
                        :lang="getLang(uiLabels.language)"
                        :key="item.item_id">
                </SetMenuItem>
                <br>
              </div>
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
    <section class="tabs1 cid-re2xcgF2G2 mbr-fullscreen mbr-parallax-background" id="tabs1-w">
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
                        <div class="container" v-if=" Object.keys(chosenIngredientsId).length !== 0">
                          <div class="row grid-item-header">
                            <div class = "col"> {{uiLabels.ingredients}} </div>
                            <div class = "col"> {{uiLabels.quantity}} </div>
                          </div>
                          <div v-for="chosen in chosenIngredientsId" class="row grid-item-row">
                            <div class = "col">
                              {{chosen["ingredient_"+getLang(uiLabels.language)]}}
                            </div>
                            <div class = "col">
                              {{chosen.quantity}}
                            </div>
                          </div>
                        </div>
                      </strong>
                      <br>
                      <strong class="price">
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
import SetMenuItem from '@/components/SetMenuItem.vue'
import OrderItem from '@/components/OrderItem_ordering_cart.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'
import sharedVueStuffClient from '@/components/sharedVueStuffClient.js'

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */

export default {
  name: 'OrderingReadyMade',
  components: {
    Ingredient,
    SetMenuItem,
    OrderItem,
  },
  mixins: [sharedVueStuff, sharedVueStuffClient], // include stuff that is used in both
                        // the ordering system and the kitchen
  data: function() { //Not that data is a function!
    return {
      chosenIngredients: [],
      chosenIngredientsId: {},
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
    for (i = 0; i < this.$refs.item.length; i += 1) {
      this.$refs.item[i].resetCounter();
    }
  },
  methods: {
    addToOrder: function (item) {
      if(item.stock >= 1){
        this.chosenIngredients.push(item);
        this.price += +item.selling_price;
          if (item.ingredient_id in this.chosenIngredientsId){
              this.chosenIngredientsId[item.ingredient_id].quantity += 1;
          }
          else{
              this.chosenIngredientsId[item.ingredient_id] = item;
              this.chosenIngredientsId[item.ingredient_id].quantity = 1;
          }
      }
      else{
        alert(this.uiLabels.maxStock);
      }
    },

    removeFromOrder:function (item) {
        if( this.chosenIngredients.indexOf(item) !== -1 ){
          this.chosenIngredients.splice( this.chosenIngredients.indexOf(item), 1 );
          this.price -= +item.selling_price;
            if(this.chosenIngredientsId[item.ingredient_id].quantity > 1){
                this.chosenIngredientsId[item.ingredient_id].quantity -= 1;
            }
            else{
                delete this.chosenIngredientsId[item.ingredient_id];
            }
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
      for (i = 0; i < this.$refs.item.length; i += 1) {
        this.$refs.item[i].resetCounter();
      }
      this.price = 0;
      this.chosenIngredients = [];
      this.eatIn = -1;
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
            console.log({order: order});
            this.newOrder({order: order});
            //set all counters to 0. Notice the use of $refs
            for (i = 0; i < this.$refs.item.length; i += 1) {
                this.$refs.item[i].resetCounter();
            }
            this.price = 0;
            this.chosenIngredients = [];
            this.chosenIngredientsId = {};
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
    checkIfValidOrder: function(){
        var i, foundCategories, itemCategory;
        foundCategories = [];
        for (i=0;i<this.chosenIngredients.length;i++){
            itemCategory = this.chosenIngredients[i].category;
            if (itemCategory < 4){
                foundCategories.push(itemCategory);
            }
            if(foundCategories.includes(1) && foundCategories.includes(2)){
                return true;
            }
        }
        if (foundCategories.length === 0){
            return true;
        }
        else{
            return false;
        }


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
#ordering-ready-made {
  margin:auto;
  padding-bottom: 80px;
  max-width: 100%;
}

.example-panel {
  position: fixed;
  left:0;
  top:0;
  z-index: -2;
}
.SetMenuItem {
  border: 1px solid #ccd;
  padding: 5px;
  width: 14em;
  height: 23em;
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
  border-color: red;
  grid-template-columns: repeat(auto-fit, calc(14em + 1px));
  padding-bottom: 40px;
}
.category{
    /*padding-top: 40px;*/
    padding-bottom: 20px;
    font-size: 20pt;
}

.grid-item-header{
  color: white;
  font-size: 22px;
  font-weight: bold;
  border: solid black;
  border-width: 4px 4px 2px 4px;
  padding: 4px;
  background: #149dcc;
}

.grid-item-row{
  border: solid 2px black;
  font-size: 18px;
  padding: 30px 0;
  align-content: center;
}

.price {
  font-size: 18px;
}
</style>