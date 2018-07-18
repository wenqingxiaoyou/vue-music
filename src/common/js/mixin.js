import {mapGetters,mapMutations,mapActions} from 'vuex'
import {playMode} from "common/js/config";
import {shuffle} from "common/js/util";

export const playListMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted() {
        this.handelPlayList(this.playlist);
    },
    activated() {
        this.handelPlayList(this.playlist);

    },
    watch: {
        playlist(newVal) {
            this.handelPlayList(newVal);
        }
    },
    methods: {
        handelPlayList() {
            throw new Error('component must implement handelPlaylist method');
        }
    }
};

export const playerMixin = {
    computed:{
        ...mapGetters([
            'playlist',
            'currentSong',
            'mode',
            'sequenceList'
        ]),
        iconMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
        },
    },
    methods:{
        ...mapMutations({
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAYLIST'
        }),
        resetCurrentIndex(list) {
            let index = list.findIndex((item) => {
                return item.id === this.currentSong.id;
            });
            this.setCurrentIndex(index);

        },
        changeMode() {
            const mode = (this.mode + 1) % 3;
            this.setPlayMode(mode);
            let list = null;
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList)
            } else {
                list = this.sequenceList;
            }

            this.resetCurrentIndex(list);

        },
    }

}

export const searchMixin = {
    data(){
      return{
          query:'',
          refreshDelay:100
      }
    },
    computed:{
        ...mapGetters([
            'searchHistory'
        ]),
    },
    methods:{
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory',
        ]),
        blurInput(){
            this.$refs.searchBox.blur();
        },
        saveSearch(){
            this.saveSearchHistory(this.query);
        },
        onQueryChange(query){
            this.query =  query;
        },
        addQuery(query){
            this.$refs.searchBox.setQuery(query)
        },
    }
}