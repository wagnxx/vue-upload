export default {
    namespaced: true,
    state: {
        options: {

            target: "http://localhost:8082/upload/file", // 目标上传 URL
            chunkSize: "2048000", //分块大小
            fileParameterName: "file", //上传文件时文件的参数名，默认file
            maxChunkRetries: 3, //最大自动失败重试上传次数
            testChunks: true, //是否开启服务器分片校验
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
            }
        }
    },
    getters: {
        getOptions(state) {
            return state.options;
        }
    }
}
