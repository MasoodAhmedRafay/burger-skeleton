<template onload="document.refresh();">
  <section class="features8 cid-rdbXcsSWfw" id="features8-4">
  <link rel="stylesheet" href="assets/web/assets/mobirise-icons2/mobirise2.css">
  <div class="container">
    <div class="media-container-row">

      <div class="card  col-12 col-md-6">
        <div class="card-img">
          <img src="/Template/assets/web/assets/eat-in.svg" style="width:100px;height:100px;">
        </div>
        <div class="card-box align-center">

          <div class="mbr-section-btn text-center">
            <a v-on:click="setEatIn(1)" href="#/ordering" class="btn btn-primary display-4">
              {{uiLabels.eatIn}}
            </a>
          </div>
        </div>
      </div>

      <div class="card  col-12 col-md-6">
        <div class="card-img">
          <span class="mbr-iconfont mbrib-shopping-bag" style="color: rgb(255, 255, 255); fill: rgb(255, 255, 255);"></span>
        </div>
        <div class="card-box align-center">
          <div class="mbr-section-btn text-center">
            <a v-on:click="setEatIn(0)" href="#/ordering" class="btn btn-primary display-4">
            {{uiLabels.takeAway}}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


</template>
<script>

//import the components that are used in the template, the name that you
//use for importing will be used in the template above and also below in
//components


//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'
import sharedVueStuffClient from '@/components/sharedVueStuffClient.js'

/* instead of defining a Vue instance, export default allows the only
necessary Vue instance (found in main.js) to import your data and methods */

export default {
  name: 'Menu',
  components: {
  },
  mixins: [sharedVueStuff, sharedVueStuffClient],

  data: function() {
    return {

    }
  },

  created: function () {

  },
  methods: {

  }
}


</script>
<style scoped>

</style>