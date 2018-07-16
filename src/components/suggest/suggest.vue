<template>
    <scroll @beforeScroll="listScroll" :beforeScroll="beforeScroll" :pullup="pullup" :data="result" ref="suggest" @scrollToEnd="searchMore" class="suggest">
        <ul class="suggest-list" >
            <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
            <div class="loading-wrap-text">
                <loading v-show="hasMore" title="正在加载中..."></loading>
                <p style="text-align: center;" v-show="!hasMore && result.length">数据加载完了</p>
            </div>

        </ul>
        <div v-show="!hasMore&&!result.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
    </scroll>
</template>

<script>
    import {search} from "api/search";
    import {ERR_OK} from "api/config";
    import {createSong} from "common/js/song";
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import Singer from 'common/js/singer'
    import {mapMutations,mapActions} from 'vuex'
    import NoResult from 'base/no-result/no-result'
    import {getSingerDetail,getSongVkey} from 'api/singer'
    import {playListMixin} from "common/js/mixin";


    const TYPE_SINGER = 'singer';
    const PERPAGE = 20;

    export default {
        name: "suggest",
        // mixins:[playListMixin],
        components:{
            Scroll,
            Loading,
            NoResult
        },
        props: {
            query: {
                type: String,
                default: ''
            },
            showSinger: {
                type: Boolean,
                default: true,
            }
        },
        data() {
            return {
                page: 1,
                result: [],
                pullup:true,
                hasMore:true,
                beforeScroll:true,

            }
        },

        methods: {
            // handelPlayList(playlist){
            //     let bottom = playlist.length ? '60px':'';
            //     this.$refs.suggest.style.bottom = bottom;
            //     this.$refs.suggest.refresh();
            // },
            ...mapMutations({
                setSinger:'SET_SINGER'
            }),
            ...mapActions([
               'insertSong'
            ]),
            listScroll(){
                this.$emit('listScroll');
            },
            selectItem(item){
                if(item.type === TYPE_SINGER){
                    const singer = new Singer({
                        id:item.singermid,
                        name:item.singername
                    });
                    this.$router.push({
                        path:`/search/${singer.id}`
                    });
                    this.setSinger(singer);
                }else{
                    this.insertSong(item);
                }
                this.$emit('select');
            },
            searchMore(){
                if(!this.hasMore){
                    return;
                }
                this.page++;
                search(this.query,this.page,this.showSinger,PERPAGE).then((res)=>{
                    if (res.code === ERR_OK) {
                        let data = res.data;
                        if (data.zhida && data.zhida.singerid) {
                            this.result.push({...data.zhida, ...{type: TYPE_SINGER}})
                        }
                        if (data.song) {
                            let list = data.song.list;
                            list.forEach((musicData) => {
                                getSongVkey(musicData.songmid).then((res)=>{
                                    let vkey = res.data.items[0].vkey;
                                    if (musicData.songid && musicData.albummid) {
                                        this.result.push(createSong(musicData,vkey));
                                    }
                                });

                            });
                        }
                        this._checkMore(res.data);
                    }
                });
            },
            search() {
                this.page = 1;
                this.hasMore = true;
                this.$refs.suggest.scrollTo(0,0);
                search(this.query, this.page, this.showSinger,PERPAGE).then(res => {
                    if (res.code === ERR_OK) {
                        this.result = this._genResult(res.data);
                        this._checkMore(res.data);
                    }
                })
            },
            refresh(){
              this.$refs.suggest.refresh();
            },
            _checkMore(data){
                const song = data.song;
                if(!song.list.length || (song.curnum+song.curpage*PERPAGE)>song.totalnum){
                    this.hasMore = false;
                }
            },
            _genResult(data) {
                let ret = [];
                if (data.zhida && data.zhida.singerid) {
                    ret.push({...data.zhida, ...{type: TYPE_SINGER}})
                }

                if (data.song) {
                    // ret = ret.concat(this._normalizeSongs(data.song.list));
                    ret = this._normalizeSongs(data.song.list);
                }
                return ret;
            },
            getIconCls(item) {
                if (item.type === TYPE_SINGER) {
                    return 'icon-mine';
                } else {
                    return 'icon-music';
                }
            },
            getDisplayName(item) {
                if (item.type === TYPE_SINGER) {
                    return item.singername;
                } else {
                    return `${item.name}-${item.singer}`
                }
            },
            _normalizeSongs(list){
                // let ret = [];
                // list.forEach((musicData)=>{
                //     if(musicData.songid && musicData.albumid){
                //         ret.push(createSong(musicData))
                //     }
                // });
                // return ret;

                let ret = [];
                list.forEach((musicData) => {
                    getSongVkey(musicData.songmid).then((res)=>{
                        let vkey = res.data.items[0].vkey;
                        if (musicData.songid && musicData.albummid) {
                            ret.push(createSong(musicData,vkey));
                        }
                    });

                });
                return ret

            }
        },
        watch: {
            query() {
                this.search();
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .loading-wrap-text
        padding:10px 0;
    .suggest
        height: 100%
        overflow: hidden
        .suggest-list
            padding: 0 30px
            .suggest-item
                display: flex
                align-items: center
                padding-bottom: 20px
            .icon
                flex: 0 0 30px
                width: 30px
                [class^="icon-"]
                    font-size: 14px
                    color: $color-text-d
            .name
                flex: 1
                font-size: $font-size-medium
                color: $color-text-d
                overflow: hidden
                .text
                    no-wrap()
        .no-result-wrapper
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>