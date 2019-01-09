<template>
    <div>
        <section class="cid-rdLXviWWKe mbr-fullscreen" id="header5-r">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="mbr-white col-md-12">
                        <div id="cart" class="container">
                            <br>
                            <h1> {{uiLabels.yourCart}} </h1>
                            <br>
                            <div v-if="Object.keys(orderToCart).length === 0">
                                {{uiLabels.emptyCart}}
                            </div>
                            <div class="container" id="container-table">
                                <div class="row" id="grid-header" v-if="Object.keys(orderToCart).length !== 0">
                                    <div class="col align-center"> {{uiLabels.item}} </div>
                                    <div class="col align-center"> {{uiLabels.ingredients}} </div>
                                    <div class="col align-center"> {{uiLabels.unitPrice}} </div>
                                    <div class="col align-center"> {{uiLabels.quantity}} </div>
                                    <div class="col align-center"> {{uiLabels.total}} </div>
                                    <div class="col align-center"> {{uiLabels.remove}} </div>
                                </div>
                                <div v-for="(order,key) in orderToCart" :key="key" class="row grid-row">
                                    <div class="col align-center grid-col">{{key}}</div>
                                    <div class="col align-center">{{order.order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}</div>
                                    <div class="col align-center">{{order.order.price}}</div>
                                    <div class="col align-center">
                                        <button class="btn-warning btn-xs" v-on:click="decrementQuantity(key)"> - </button>
                                        {{order.order.quantity}}
                                        <button class="btn-warning btn-xs" v-on:click="incrementQuantity(key)"> + </button>
                                    </div>
                                    <div class="col align-center">{{(order.order.price * order.order.quantity)}}</div>
                                    <div class="col align-center">
                                        <button class="btn-warning btn-xs" v-on:click="deleteItem(key)">{{uiLabels.remove}}</button>
                                    </div>
                                </div>
                            </div>

                            <br>
                            <div v-if="totalPrice != '0'">
                                {{uiLabels.price}}: {{totalPrice}} SEK
                            </div>
                            <div>
                                <button class="btn btn-dark btn-sm" v-on:click="clearCart()"> {{uiLabels.clear}} </button>
                                <button class="btn btn-dark btn-sm" v-on:click="placeOrder()"> {{uiLabels.order}} </button>
                                <br>
                                <br>
                                <br>
                                <br>
                                <h1 v-if="orderNumber !== ''">  {{uiLabels.yourOrderNumber}}: {{orderNumber}}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mbr-arrow hidden-sm-down" aria-hidden="true">
                <a href="#tabs1-y">
                    <i class="mbri-down mbr-iconfont"></i>
                </a>
            </div>
        </section>
        <section class="tabs1 cid-re2zY5gxPH mbr-parallax-background" id="tabs1-y">

            <div class="mbr-overlay" style="opacity: 0.6; background-color: rgb(35, 35, 35);">
            </div>
            <div class="container">
                <h2 class="mbr-white align-center pb-5 mbr-fonts-style mbr-bold display-2">
                    {{ uiLabels.ordersInQueue }}</h2>
                <div class="media-container-row">
                    <div class="col-12 col-md-8">
                        <ul class="nav nav-tabs" role="tablist">
                            <div v-for="(order, orderkey) in orders"
                                 v-if="order.status !== 'done'" :key="orderkey">
                                <li class="nav-item">
                                    <a class="nav-link mbr-fonts-style active display-7" role="tab" data-toggle="tab" href="#tabs1-y_tab0">
                                        {{orderkey}}
                                    </a>
                                </li>
                            </div>



                        </ul>
                        <div class="tab-content">
                            <div id="tab1" class="tab-pane in active" role="tabpanel">
                                <div class="row">
                                    <div class="col-md-12">
                                        <p class="mbr-text py-5 mbr-fonts-style display-7"></p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import OrderItem from '@/components/OrderItem_ordering_cart.vue'

    import sharedVueStuff from '@/components/sharedVueStuff.js'
    import sharedVueStuffClient from '@/components/sharedVueStuffClient.js'

    export default {
        name: "Cart",
        mixins: [sharedVueStuff, sharedVueStuffClient],
        components: {
            OrderItem,
        },
        data: function () {
            return{
                orderToCart:{},
                currentItemsCount:0,
                totalPrice:0,
                orderNumber:"",
                selectedItems:[],
            }

        },

        created: function (){
            this.$store.state.socket.on('orderNumber', function (data) {
                this.orderNumber = data;
            }.bind(this));
            this.reloadPage();
        },
        mounted() {
            // Get stored cart when mounting, refreshing. (persisting the data when the page is refreshed)
            if (localStorage.getItem('currentItemsCount')) {
                this.currentItemsCount = Number(localStorage.getItem('currentItemsCount'));
            }
            if (localStorage.getItem('totalPrice')) {
                this.totalPrice = Number(localStorage.getItem('totalPrice'));
            }
            if (localStorage.getItem('orderToCart')) {
                this.orderToCart = JSON.parse(localStorage.getItem('orderToCart'));
            }
            if (localStorage.getItem('newOrderItem')) {
                this.addItem()
            }
        },
        watch: {
            currentItemsCount: {
                handler() {
                    localStorage.setItem('currentItemsCount', this.currentItemsCount);
                },
            },
            orderToCart: {
                handler() {
                    localStorage.setItem('orderToCart', JSON.stringify(this.orderToCart));
                },
            },
            totalPrice: {
                handler() {
                    localStorage.setItem('totalPrice', this.totalPrice);
                },
            },

        },
        methods:{
            addItem:function(){
                var i;
                for (i in this.newOrderItem){
                    var itemId = this.getOrderItemNumber();
                    this.totalPrice += this.newOrderItem[i].order.price;
                    this.orderToCart[itemId] = this.newOrderItem[i];
                }
                this.newOrderItem = [];
            },
            placeOrder: function () {
                if(Object.keys(this.orderToCart).length > 0) {
                    this.$store.state.socket.emit('order', {order: this.orderToCart, eatIn: this.eatIn});
                    this.orderToCart = {};
                    this.totalPrice = 0;
                    this.clearStorage();
                    alert(this.uiLabels.thankOrder);
                }
                else{
                    alert(this.uiLabels.minCart);
                }
            },
            getOrderItemNumber: function () {
                this.currentItemsCount += 1;
                return this.currentItemsCount;
            },
            getSelectedItems: function(){
                var items,i, item_key;
                items={};
                for (i = 0; i < this.selectedItems.length; i += 1) {
                    item_key = this.selectedItems[i];
                    items[item_key]=this.orderToCart[item_key];
                }
                return items;
            },
            incrementQuantity: function(itemKey){
                if (this.orderToCart[itemKey].order.quantity  < this.orderToCart[itemKey].order.stock){
                    this.orderToCart[itemKey].order.quantity += 1;
                    this.totalPrice += this.orderToCart[itemKey].order.price;
                }
                else{
                    alert(this.uiLabels.maxQuantity)
                }
            },
            decrementQuantity: function(itemKey){
                if (this.orderToCart[itemKey].order.quantity > 1)
                    {
                        this.orderToCart[itemKey].order.quantity -= 1;
                        this.totalPrice -= this.orderToCart[itemKey].order.price;
                    }

            },
            deleteItem: function(itemKey){
                this.totalPrice -= this.orderToCart[itemKey].order.price;
                this.currentItemsCount -= 1;
                delete this.orderToCart[itemKey];
            },

            clearCart: function () {
                if(this.currentItemsCount > 0){
                    if (confirm(this.uiLabels.confirmClear)){
                        this.currentItemsCount =0;
                        this.totalPrice = 0;
                        this.orderToCart={};
                        this.clearStorage();
                    }
                }

            }

        }


    }
</script>

<style scoped>

#cart {
    margin:auto;
    padding-top: 1px;
    max-width: 100%;
}
#grid-header{
    color: black;
    font-size: 20px;
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
.button{
    padding-top: 40px;
}
.ing-grid{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: auto auto auto auto auto auto;
    text-align: left;

}
</style>
