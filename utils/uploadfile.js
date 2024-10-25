import { packApiUrl } from "./common.js";  
export function uploadFile(config = {}) {  
    let {  
        url,  
        filePath, // 必填项：要上传的文件路径  
        fileName = 'file', // 可选项：服务器端接收的文件参数名，默认为 'file'  
        formData = {}, // 可选项：其他要随文件一起发送的表单数据  
        header = {}, // 可选项：请求头信息  
        successCallback, // 成功回调  
        failCallback // 失败回调  
    } = config;  
  
    // 打包API URL（如果有自定义的URL处理逻辑）  
    url = packApiUrl(url);  
  
    // 调用uni.uploadFile进行文件上传  
    return new Promise((resolve, reject) => {  
        uni.uploadFile({  
            url: url,  
            filePath: filePath,  
            name: fileName,  
            formData: formData,  
            header: header,  
            success: (uploadFileRes) => {  
                console.log('文件上传成功', uploadFileRes);  
                  
                // 假设服务器返回的数据在 uploadFileRes.data 中  
                if (uploadFileRes.statusCode === 200) {  
                    // 调用成功回调（如果存在）  
                    if (successCallback) {  
                        successCallback(uploadFileRes.data);  
                    }  
                    resolve(uploadFileRes.data);  
                } else {  
                    // 处理非200状态码的错误  
                    uni.showToast({  
                        title: '文件上传失败',  
                        icon: 'none'  
                    });  
                    // 如果有失败回调，则调用它；否则，通过reject返回错误  
                    if (failCallback) {  
                        failCallback(uploadFileRes);  
                    } else {  
                        reject(uploadFileRes);  
                    }  
                }  
            },  
            fail: (err) => {  
                console.log('文件上传失败', err);  
                  
                // 显示上传失败提示  
                uni.showToast({  
                    title: '文件上传失败',  
                    icon: 'none'  
                });  
                  
                // 调用失败回调（如果存在）；否则，通过reject返回错误  
                if (failCallback) {  
                    failCallback(err);  
                } else {  
                    reject(err);  
                }  
            }  
        });  
    });  
}
export default uploadFile;