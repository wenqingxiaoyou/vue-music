<template>


    <div class="upload">
        <div class="box">
            <input accept="image/*" capture="video" ref="inputer" @change="handleFileChange" class="input-file" id="id" type="file">
            <label for="id"></label>
        </div>
        <div class="img-wrap">
            <img :src="dataUrl">
        </div>
    </div>
</template>

<script>

    import axios from 'axios';


    export default {
        name: "upload",
        props:{
            value:{
                type:String,
                default:'',
            }
        },
        components: {

        },

        data () {
            return {
                dataUrl:'',
            }
        },
        created(){
            this.$nextTick(()=>{
            })
        },
        mounted(){

        },
        methods:{
            imgPreview(file){
              let self = this;
              if(!file || !window.FileReader)return;
              if(/^image/.test(file.type)){
                  console.log(file.type);
                  let reader = new FileReader();
                  // 将图片将转成 base64 格式
                  reader.readAsDataURL(file);
                  // 读取成功后的回调
                  reader.onloadend = function () {
                      self.dataUrl = this.result;
                  }
              }
            },
            handleFileChange(e){
                let inputDom = this.$refs.inputer;
                this.file = inputDom.files[0];
                this.errText = '';
                console.log(this.file);
                let size = Math.floor(this.file.size/1024);
                this.$emit('input',this.file);
                this.fileName = this.file.name;
                this.onChange && this.onChange(this.file,inputDom.value);
                this.imgPreview(this.file);

                let param = new FormData(); //创建form对象
                param.append('api_token','dj1FWyx8sQGAqjoFBB0AegIGDmJV2kqydsueYiGLCnbyYzneOPNezRMi0C1bAYYr');//添加form表单中其他数据
                param.append('idCard_img',this.file);//通过append向form对象添加数据

                axios.post('http://angelpool.jinleyuanmall.cn/api/user/upload',param)
                    .then(response=>{
                        console.log(response.data);
                    })
            }
        }
    }
</script>

<style scoped>
    .box {
        position: relative;
        height: 100px;
        width: 200px;
        background-color: #fff;
        border-radius: 10px;
    }
    .input-file{
        font-size: 0;
        position: absolute;
        z-index: -999;
    }
    .box label {
        position: absolute;
        top: 0;left: 0;right: 0;bottom: 0;
        z-index: 10; /* 这个z-index之后说到*/
    }
    input::-webkit-file-upload-button {
        background: #efeeee;
        font-size: 0;
        color: #333;
        border: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        box-shadow: 1px 1px 5px rgba(0,0,0,.1), 0 0 10px rgba(0,0,0,.12);
    }

    .img-wrap{
        width: 100px;
        height: 100px;
    }
    .img-wrap img{
        max-width: 100%;
        height: auto;
        width: auto \9; /* ie8 */
        -ms-interpolation-mode: bicubic; /*为了照顾ie图片缩放失真*/
    }
</style>