import { packApiUrl } from "./common.js";  

export function request(config = {}) {  
    let {  
        url,  
        data = {},  
        method = "POST",  
        header = {}  
    } = config;  

    url = packApiUrl(url);  

    return new Promise((resolve, reject) => {  
        uni.request({  
            url,  
            data,  
            method,  
            header,  
            success: res => {  
                // 检查 res 的 statusCode  
					
                    // 进一步检查返回的数据结构  
                    if (res) {  
                        console.log(res)
                        resolve(res.data);  
                   } else {  
                    // 如果 statusCode 不为 200，处理错误  
                    uni.showToast({  
                        title: '请求失败',  
                        icon: "none"  
                    });  
                    reject(res.data);  
                }  
            },  
            fail: err => {  
                // 网络错误处理  
                uni.showToast({  
                    title: '请求失败',  
                    icon: "none"  
                });  
                reject(err);  
            }  
        });  
    });  
}

export default request;