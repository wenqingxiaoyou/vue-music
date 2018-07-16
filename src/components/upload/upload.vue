<template>


    <div class="upload">
       <input-upload path=""></input-upload>
    </div>
</template>

<script>

    import inputUpload from 'components/input-upload/input-upload'
    export default {
        name: "upload",
        props:{
          value:{
              type:String,
              default:'',
          }
        },
        components: {
            inputUpload
        },

        data () {
            return {

            }
        },
        created(){

        },
        mounted(){

        },
        methods:{

        }
    }
</script>

<style scoped>
.upload{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #ff6400;
}
</style>