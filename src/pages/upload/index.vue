<template>
  <div>
    upload page

    <div
      draggable="true"
      class="drop"
      @drop="drophandle"
      @dragover.prevent
      @dragend.prevent
    >
      droped
    </div>
  </div>
</template>

<script>
  export default {
    name: "uploadIndexpage",
    data() {
      return {
        superiorID: "svn/root/tar"
      };
    },

    methods: {
      drophandle(e) {
      
        this.Bus.$emit("openUploader", {
          superiorID: this.superiorID,
          type:'drop',
          uploader_flag:true,
          event:e,
          target:this.superiorID
        });
        return false;
      }
    }
  };
</script>
<style>
  .tar {
    width: 333px;
    height: 124px;
    border: 1px solid #ddd;
    margin-top: 22px;
  }

  .drop {
    width: 400px;
    height: 200px;
    border: 1px dotted #ddd;
  }
  .myImg {
    width: 26%;
    display: inline-block;
    height: 88px;
    margin: 10px;
  }
</style>
