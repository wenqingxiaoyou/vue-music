<template>
    <div class="progress-bar" ref="progressBar" @click.prevent="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper needsclick" ref="progressBtn"
                 @touchstart.prevent="progressTouchStart"
                 @touchmove.prevent="progressTouchMove"
                 @touchend="progressTouchEnd"
            >
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {prefixStyle} from "common/js/dom";

    const transform = prefixStyle('transform');
    const progressBtnWidth = 16;
    export default {
        name: "progress-bar",
        props:{
            percent:{
                type:Number,
                default:0
            }
        },
        created(){
          this.touch = {}; //用于不同回调时的数据共享挂载
        },
        methods:{
            progressTouchStart(e){
                this.touch.initated = true;
                this.touch.startX = e.touches[0].pageX;
                this.touch.left = this.$refs.progress.clientWidth;

            },
            progressTouchMove(e){
                if(!this.touch.initated)return;
                let deltaX = e.touches[0].pageX - this.touch.startX;
                let offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,this.touch.left+deltaX));
                this._offset(offsetWidth);

            },
            progressTouchEnd(e){
                this.touch.initated = false;
                this._triggerPercent();
            },
            _offset(offsetWidth){
                this.$refs.progress.style.width =  `${offsetWidth}px`;
                this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
            },
            _triggerPercent(){
                let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                let percent = this.$refs.progress.clientWidth / barWidth;
                this.$emit('percentChange',percent);
            },
            progressClick(e){
                // console.log(e);
                // this._offset(e.offsetX);
                //当我们点击 progressBtn e.offsetX 获取不对;
                const rect = this.$refs.progressBar.getBoundingClientRect();
                const offsetWidth = e.pageX - rect.left;
                this._offset(offsetWidth);
                this._triggerPercent()
            }
        },
        watch:{
            percent(newPercent){
                if(newPercent>=0 && !this.touch.initated){
                    let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                    let offsetWidth = newPercent * barWidth;
                    this._offset(offsetWidth);

                }
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .progress-bar
        height: 30px
        .bar-inner
            position: relative
            top: 13px
            height: 4px
            background: rgba(0, 0, 0, 0.3)
            .progress
                position: absolute
                height: 100%
                background: $color-theme
            .progress-btn-wrapper
                position: absolute
                left: -8px
                top: -13px
                width: 30px
                height: 30px
                .progress-btn
                    position: relative
                    top: 7px
                    left: 7px
                    box-sizing: border-box
                    width: 16px
                    height: 16px
                    border: 3px solid $color-text
                    border-radius: 50%
                    background: $color-theme
</style>