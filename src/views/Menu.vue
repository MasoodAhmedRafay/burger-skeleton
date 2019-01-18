<template onload="document.refresh();">
  <section class="features8 cid-rdbXcsSWfw" id="features8-4">
  <link rel="stylesheet" href="assets/web/assets/mobirise-icons2/mobirise2.css">
  <div class="container" id ="eatInOrTakeAway">
    <div class="media-container-row">
      <div class="col-12 col-md-12 nav">
        <button class="btn btn-primary display-4 disabled">
          <span aria-hidden="true">&larr;</span>   {{uiLabels.previous}}
        </button>
        <span class="nextButton">
          <button class="btn btn-primary nextButton display-4" v-on:click="switchMenu()">{{uiLabels.next}}
            <span aria-hidden="true">&rarr;</span>
          </button>
        </span>
      </div>
    </div>
    <br>
    <br>
    <div class="media-container-row">
      <div class="card  col-12 col-md-6">
        <div class="card-img">
          <img src="/Template/assets/web/assets/eat-in.svg" style="width:100px;height:100px;">
        </div>
        <div class="card-box align-center">

          <div class="mbr-section-btn text-center">
            <a v-on:click="goNext(1)" class="btn btn-primary display-4">
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
            <a v-on:click="goNext(0)" class="btn btn-primary display-4">
            {{uiLabels.takeAway}}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container" id ="readyOrCustom">
    <div class="media-container-row">
      <div class="col-12 col-md-12 nav">
        <button class="btn btn-primary display-4" v-on:click="switchMenu()">
          <span aria-hidden="true">&larr;</span>   {{uiLabels.previous}}
        </button>
        <span class="nextButton">
          <button class="btn btn-primary nextButton display-4 disabled" > {{uiLabels.next}}
            <span aria-hidden="true">&rarr;</span>
          </button>
        </span>
      </div>
    </div>
    <br>
    <br>
    <div class="media-container-row">
      <div class="card  col-12 col-md-6">
        <div class="card-img">
          <span class="mbr-iconfont mbri-edit"></span>
        </div>
        <div class="card-box align-center">


          <div class="mbr-section-btn text-center"><a v-on:click="goToOrdering(1)" class="btn btn-primary display-4">
             {{uiLabels.customize}}</a></div>
        </div>
      </div>

      <div class="card  col-12 col-md-6">
        <div class="card-img">
          <span class="mbri-touch mbr-iconfont"></span>
        </div>
        <div class="card-box align-center">


          <div class="mbr-section-btn text-center"><a v-on:click="goToOrdering(2)" class="btn btn-primary display-4">
            {{uiLabels.setMenu}}</a></div>
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
      switchMenu: function(){
          var eatInOrTakeAway = document.getElementById("eatInOrTakeAway");
          var readyOrCustom = document.getElementById("readyOrCustom");
          if (window.getComputedStyle(readyOrCustom).display === "none"){
              eatInOrTakeAway.style.display = "none";
              readyOrCustom.style.display = "block";
          }
          else{
              eatInOrTakeAway.style.display = "block";
              readyOrCustom.style.display = "none";
          }
      },
      goNext: function(value){
          this.switchMenu();
          this.setEatIn(value);
      },
      goToOrdering: function(value){
          if (this.eatIn === -1){
              alert(uiLabels.chooseOption);
          }
          else{
              if(value==1){
                  window.location.href = "#/ordering";
              }
              else{
                  window.location.href = "#/orderingReadyMade";
              }


          }
      }

  }
}


</script>
<style scoped>
#readyOrCustom{
  display: none;
}
#features8-4{
  padding-bottom: 155px;
}
.nextButton{
  margin-left: 67%;
}
.nav .btn {
  margin-left: 1px;
  margin-right: 1px;
}
.nav .btn-primary {
  font-size: 14px;
  color: rgba(58, 133, 191, 0.75);
  letter-spacing: 1px;
  line-height: 15px;
  border: 2px solid rgba(58, 133, 191, 0.75);
  border-radius: 40px;
  background: transparent;
  transition: all 0.3s ease 0s;
}

.nav .btn-primary:hover {
  color: #FFF;
  background: rgba(58, 133, 191, 0.75);
  border: 2px solid rgba(58, 133, 191, 0.75);
}

</style>