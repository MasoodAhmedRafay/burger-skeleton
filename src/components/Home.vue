<template>
    <div>
        <section class="cid-qTkA127IK8 mbr-fullscreen mbr-parallax-background" id="header2-1">

            <div class="container align-center">
                <div class="row justify-content-md-center">
                    <div class="mbr-white col-md-10">
                        <h1 class="mbr-section-title mbr-bold pb-3 mbr-fonts-style display-1"><em><a href="" id ="headline">
                            Crafty Burgers AB</a></em></h1>


                        <div class="mbr-section-btn">
                            <a class="btn btn-md btn-primary display-4" href="#/menu">{{uiLabels.placeOrder}}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mbr-arrow hidden-sm-down" aria-hidden="true">
                <a href="#footer1-q">
                    <i class="mbri-down mbr-iconfont"></i>
                </a>
            </div>
        </section>
    </div>
</template>

<script>
    import sharedVueStuff from '@/components/sharedVueStuff.js'
    import sharedVueStuffClient from '@/components/sharedVueStuffClient.js'
    export default {
        name: "Home",
        mixins: [sharedVueStuff, sharedVueStuffClient],
        components: {
        },
        data: function () {
            return{
            }

        },

        created: function (){

        },
        mounted() {

        },
        methods:{
        },

    }
</script>

<style scoped>
#headline{
    color:black;
    background: linear-gradient(#149dcc, grey, transparent);
}
</style>