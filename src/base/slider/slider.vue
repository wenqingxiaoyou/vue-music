<template>
    <!-- Slider main container -->
    <div class="swiper-container">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->
            <slot></slot>
        </div>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>

    </div>
</template>

<script type="text/ecmascript-6">
    import {addClass} from 'common/js/dom'
    import Swiper from 'swiper';
    export default {
        name: 'slider',
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
        data() {
            return {
                dots: [],
            }
        },
        mounted() {
            setTimeout(() => {
                this.mySwiper = new Swiper('.swiper-container', {
                    autoplay:true,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    loop:true
                });
            }, 20)
        },
        activated() {

        },
        deactivated() {

        },
        beforeDestroy() {

        },
        methods: {

        },
        destroyed(){
            if(this.mySwiper.slides.length<=3){
                this.mySwiper.destroy();
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.6/css/swiper.css"
    .slider
        min-height: 1px
        .slider-group
            position: relative
            overflow: hidden
            white-space: nowrap
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display: block
                    width: 100%
                    overflow: hidden
                    text-decoration: none
                img
                    display: block
                    width: 100%
        .dots
            position: absolute
            right: 0
            left: 0
            bottom: 12px
            text-align: center
            font-size: 0
            .dot
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius: 50%
                background: $color-text-l
                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll

    .swiper-container
        width: 100%
        height: 150px
        overflow: hidden
        .swiper-wrap
            height: 300px
    .swiper-slide
        overflow: hidden
        img
            width: 100%
</style>