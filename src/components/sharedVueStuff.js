'use strict';

// Stuff that is used both in the ordering system and in the kitchen
var sharedVueStuff = {
  data: function () {
    return {
      orders: {},
      ingredients: {},
      categories: {},
      setMenuItems: {}
    }
  },

  created: function () {
    this.$store.state.socket.emit('pageLoaded');
    this.$store.state.socket.on('initialize', function (data) {
      this.orders = data.orders;
      this.ingredients = data.ingredients;
      this.categories = data.categories;
      this.setMenuItems = data.setMenuItems;
    }.bind(this));
    this.$store.state.socket.on('currentQueue', function (data) {
      this.orders = data.orders;
      if (typeof data.ingredients !== 'undefined') {
        this.ingredients = data.ingredients;
      }
    }.bind(this));


  },
  mounted() {
  },
  methods: {

  }
};

export default sharedVueStuff;