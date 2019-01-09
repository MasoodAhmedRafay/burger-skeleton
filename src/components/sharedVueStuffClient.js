'use strict';

// Stuff that is used both in the ordering system and in the kitchen
var sharedVueStuffClient = {
    data: function () {
        return {
            newOrderItem: [],
            eatIn: 1
        }
    },
  computed: {
    uiLabels: {get: function(){
            return this.$store.state.uiLabels;
        },
        set: function(uiLabels){
            this.$store.commit('setUiLabels', uiLabels);
        }
    },
    lang: {get: function(){
      return this.$store.state.lang;
      },
      set: function(lang){
        this.$store.commit('switchLang', lang);
      }
    }
  },

  created: function () {
      if (localStorage.getItem('lang')){
          this.$store.state.socket.emit('pageLoaded', JSON.parse(localStorage.getItem('lang')));
      }
      else{
          this.$store.state.socket.emit('pageLoaded');
      }
    this.$store.state.socket.on('initialize', function (data) {
      this.$store.commit('setUiLabels', data.uiLabels);
    }.bind(this));
    this.$store.state.socket.on('switchLang', function (data) {
      this.$store.commit('setUiLabels', data);
        this.getMenu();
    }.bind(this));
    this.getMenu();

  },
  mounted() {
      // Get stored cart when mounting, refreshing. (persisting the data when the page is refreshed)
      if (localStorage.getItem('lang')) {
        this.lang = JSON.parse(localStorage.getItem('lang'));
      }
      if (localStorage.getItem('uiLabels')) {
          this.uiLabels = JSON.parse(localStorage.getItem('uiLabels'));
          this.getMenu();
      }
      if (localStorage.getItem('newOrderItem')) {
          this.newOrderItem = JSON.parse(localStorage.getItem('newOrderItem'));
      }
      if (localStorage.getItem('eatIn')) {
          this.eatIn = Number(localStorage.getItem('eatIn'));
      }
  },
  watch: {
      lang: {
          handler() {
              localStorage.setItem('lang', JSON.stringify(this.lang));

          },
      },
      uiLabels: {
          handler() {
              localStorage.setItem('uiLabels', JSON.stringify(this.uiLabels));
          },
      },
      newOrderItem:{
          handler() {
              localStorage.setItem('newOrderItem', JSON.stringify(this.newOrderItem));

          },
      },
      eatIn:{
          handler() {
              localStorage.setItem('eatIn', JSON.stringify(this.eatIn));

          },
      }


  },
  methods: {
    switchLang: function () {
      if (this.lang === "en") {
        this.lang = "sv";
      } else {
        this.lang = "en";
      }
      this.$store.state.socket.emit('switchLang', this.lang);

    },
    newOrder: function(orderItem){
        this.newOrderItem.push({order: orderItem.order});
    },
    setEatIn: function(value){
        this.eatIn = value;
    },
    reloadPage: function(){
        if (localStorage.getItem('reloaded')) {
          localStorage.removeItem('reloaded');
        } else {
          localStorage.setItem('reloaded', '1');
          location.reload();
        }
    },
    getMenu: function(){
        if ('home' in this.uiLabels){
            document.getElementById("homeTitle").innerHTML = this.uiLabels.home;
            document.getElementById("menuTitle").innerHTML = this.uiLabels.menu;
            document.getElementById("cartTitle").innerHTML = this.uiLabels.cartLabel;
            document.getElementById("languageTitle").innerHTML = this.uiLabels.languageLabel;
            document.getElementById("languageSelected").innerHTML = this.uiLabels.language;
            document.getElementById("languageButton").onclick = this.switchLang;
        }
        else{
            document.getElementById("homeTitle").innerHTML = "Home";
            document.getElementById("menuTitle").innerHTML = "Menu";
            document.getElementById("cartTitle").innerHTML = "Cart";
            document.getElementById("languageTitle").innerHTML = "Language";
            document.getElementById("languageSelected").innerHTML = "Svenska";
            document.getElementById("languageButton").onclick = this.switchLang;
        }
    },
    clearStorage: function(){
        localStorage.removeItem('orderToCart');
        localStorage.removeItem('totalPrice');
        localStorage.removeItem('currentItemsCount');
        localStorage.removeItem('newOrderItem');
        localStorage.removeItem('eatIn');
    }
  }
};

export default sharedVueStuffClient;