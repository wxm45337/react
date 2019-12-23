import axios from './axios.config.js'

var _timeout = 180000;
var multipleCfg = {
    headers: {
        'Content-Type': undefined
    },
    timeout:_timeout,
    transformRequest: function(data, headersGetter) {
        if(data){
            var formData = new FormData();
            for(var key in data){
                if(key == 'file'){
                    var uploadFiles = data[key];
                    for(var field in uploadFiles){
                        for(var file in uploadFiles[field]){
                            formData.append(field, uploadFiles[field][file]);
                        }
                    }
                }else{
                    formData.append(key, data[key]);
                }
            }
            return formData;
        }                    
    }
};
class BaseRequest{
    get(url, param , config){
        return new Promise((resolve)=> axios.get(url, param||{} , Object.assign({ timeout:_timeout }, config)).then(data=> resolve(data) ) )
    }
    post(url, param , config){
        return new Promise((resolve)=> axios.post(url, param||{}, Object.assign({ timeout:_timeout }, config)).then(data=> resolve(data) ) )
    }
    //如果需要上传文件，需要放到params的file属性中，file属性的值必须是对象类型 params = {file:{'photo': files, 'doc': files}}
    multiple(url, param, config){
        return new Promise((resolve)=> axios.post(url, param||{}, Object.assign(multipleCfg, config)).then(data=> resolve(data) ) )
    }
}
export default BaseRequest;