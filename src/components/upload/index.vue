<template>
  <div class="uploader"
   draggable="true"
   @drop="drop"
   @dragover.prevent
     >
    drop area!!123456
  </div>
</template>

<script>
  import Uploader from "simple-uploader.js";

  export default {
    name: "drop",

    methods: {
        drop(evt){
            debugger
            this.uploader.onDrop(evt)
        }
    },

    created() {
      // this.options.initialPaused = !this.autoStart
      const uploader = new Uploader(this.options);
      this.uploader = uploader;
    //   this.uploader.fileStatusText = this.fileStatusText;
    //   uploader.on("catchAll", this.allEvent);
   
    },
    mounted() {
        
        let _this = this;

        this.$nextTick(() => {

            _this.Bus.$on('openUploader',(query)=>{
                
                this.drop();
            });
        });
    },
  };
</script>
<style>
.uploader{
    width:300px;
    height: 111px;
    border: 1px solid;
}
</style>