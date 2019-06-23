<template>
  <div id="global-uploader" v-show="uploader_flag">
    <!-- 上传 -->
    <uploader
      ref="uploader"
      :options="options"
      :autoStart="false"
      @file-added="onFileAdded"
      @file-success="onFileSuccess"
      @file-progress="onFileProgress"
      @file-error="onFileError"
      class="uploader-app"
    >
      <uploader-drop ref="drop"> </uploader-drop>
      <uploader-unsupport></uploader-unsupport>

      <uploader-btn id="global-uploader-btn" :attrs="attrs" ref="uploadBtn"
        >选择文件</uploader-btn
      >

      <uploader-list v-show="panelShow">
        <div
          class="file-panel"
          slot-scope="props"
          :class="{'collapse': collapse}"
        >
          <div class="file-title">
            <h2>文件列表</h2>

          </div>

          <ul class="file-list">
            <li v-for="file in props.fileList" :key="file.id">
              <uploader-file
                :class="'file_' + file.id"
                ref="files"
                :file="file"
                :list="true"
              ></uploader-file>
            </li>
            <div class="no-file" v-if="!props.fileList.length">
              <i class="nucfont inuc-empty-file"></i> 暂无待上传文件
            </div>
          </ul>
        </div>
      </uploader-list>
    </uploader>
  </div>
</template>
<script>
  import { mapGetters, mapState } from "vuex";
  import $ from "jquery";
  import SparkMD5 from "spark-md5";
  export default {
    data() {
      return {
        uploader: null,
        collapse: true,
        uploader_flag: false,
        options: {
          target: "http://localhost:8082/upload/file", // 目标上传 URL
          // chunkSize: "2048000", //分块大小
          // fileParameterName: "file", //上传文件时文件的参数名，默认file
          // maxChunkRetries: 3, //最大自动失败重试上传次数
          testChunks: true, //是否开启服务器分片校验
          query: { upload_token: 'my_token' },
          method:'post',
          // 服务器分片校验函数，秒传及断点续传基础
          // checkChunkUploadedByResponse: function (chunk, message) {
          //     // debugger
          //     // let objMessage = JSON.parse(message);
          //     // if (objMessage.skipUpload) {
          //     //   return true;
          //     // }

          //     // return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0;
          // },
          headers: {
            // 在header中添加的验证，请根据实际业务来
            // Authorization: "Bearer " + Ticket.get().access_token
          },
          
          
        },

        attrs: {
          // 接受的文件类型，形如['.png', '.jpg', '.jpeg', '.gif', '.bmp'...] 这里我封装了一下
          // accept: ACCEPT_CONFIG.getAll()
        },
        panelShow: false, //选择文件后，展示上传panel
       
      };
    },

    methods: {
      onFileAdded(file) {
        this.panelShow = true;

        // 计算MD5，下文会提到
        this.computeMD5(file);
      },
      // 文件进度的回调
      onFileProgress(rootFile, file, chunk) {
        console.log(
          `上传中 ${file.name}，chunk：${chunk.startByte /
            1024 /
            1024} ~ ${chunk.endByte / 1024 / 1024}`
        );
      },
      onFileSuccess(rootFile, file, response, chunk) {
        let res = JSON.parse(response);

        // 服务器自定义的错误，这种错误是Uploader无法拦截的
        if (!res.result) {
          this.$message({ message: res.message, type: "error" });
          return;
        }

        // 如果服务端返回需要合并
        if (res.needMerge) {
          api
            .mergeSimpleUpload({
              tempName: res.tempName,
              fileName: file.name,
              ...this.params
            })
            .then(data => {
              // 文件合并成功
              Bus.$emit("fileSuccess", data);
            })
            .catch(e => {});
          // 不需要合并
        } else {
          Bus.$emit("fileSuccess", res);
          console.log("上传成功");
        }
      },

      onFileError(rootFile, file, response, chunk) {
        console.log(this.error);
      },
      computeMD5(file) {
        let fileReader = new FileReader();
        let time = new Date().getTime();
        let md5 = "";

        file.pause();

        fileReader.readAsArrayBuffer(file.file);

        fileReader.onload = e => {
          if (file.size != e.target.result.byteLength) {
            // this.error(
            //   "Browser reported success but could not read the file until the end."
            // );
            return;
          }

          md5 = SparkMD5.ArrayBuffer.hash(e.target.result);

          // 添加额外的参数
          this.uploader.opts.query = {
            ...this.params
          };

          console.log(
            `MD5计算完毕：${file.id} ${
              file.name
            } MD5：${md5} 用时：${new Date().getTime() - time} ms`
          );

          file.uniqueIdentifier = md5;
          file.resume();
        };

        fileReader.onerror = function() {
          // this.error(
          //   "FileReader onerror was triggered, maybe the browser aborted due to high memory usage."
          // );
        };
      },
      fileListShow() {},
      close() {}
    },
 
    mounted() {
      console.log(this.getOptions);
      let _this = this;
      let uploader = this.$refs.uploader.uploader;
      let drop = _this.$refs.drop;
  
      this.uploader = uploader;
      this.$nextTick(() => {
        _this.Bus.$on("openUploader", query => {
          if (_this.$refs.drop && query.type === "drop") {
            _this.uploader_flag=query.uploader_flag;
            uploader.opts.query.target = query.target;
            uploader.onDrop.call(uploader, query.event);
          }
        });
      });
    }
  };
</script>
