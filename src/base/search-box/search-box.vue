<template>
    <div class="search-box">
        <i class="icon-search"></i>
        <input ref="query" type="text" class="box" v-model="query" :placeholder="placeholder">
        <i class="icon-dismiss"  @click="query=''" v-show="query"></i>
    </div>
</template>
<script>
    import {debounce} from "common/js/util";
    export default {
        name: "search-box",
        props:{
            placeholder:{
                type:String,
                default:'搜索歌曲、歌手'
            }
        },
        data(){
            return{
                query:'',
            }
        },
        created(){
            //两种方式  效果一样。
            this.$watch('query',debounce((newQuery)=>{
                this.$emit('query',newQuery);
            }));
        },
        methods:{
            blur(){
                this.$refs.query.blur();
            },
            setQuery(query){
                this.query = query;
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    .search-box
        display: flex
        align-items: center
        box-sizing: border-box
        width: 100%
        padding: 0 6px
        height: 40px
        background: $color-highlight-background
        border-radius: 6px
        .icon-search
            font-size: 24px
            color: $color-background
        .box
            flex: 1
            margin: 0 5px
            line-height: 18px
            background: $color-highlight-background
            color: $color-text
            font-size: $font-size-medium
            &::placeholder
                color: $color-text-d
        .icon-dismiss
            font-size: 16px
            color: $color-background
</style>