import {mapGetters} from 'vuex'

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