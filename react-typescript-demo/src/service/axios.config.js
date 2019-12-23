import axios from 'axios'

axios.defaults.withCredentials=true;//跨域设置

// let {PORT, NODE_ENV, HTTP_PROXY} = process.env;

let //LoadingService , 
    OVERTIME_CODE = 2 ,ERROR_CODE = 1;

let instance = axios.create({ 
    baseURL : `http://127.0.0.1:9001/cloudmarket-server`
});

//请求拦截器
instance.interceptors.request.use(
    async config => {
        // if(!config.noLoading){
        //     LoadingService = Loading.service({
        //         lock: true,
        //         text: config.loadingMsg||'努力加载中',
        //         spinner: 'el-icon-loading',
        //         background: 'rgba(0, 0, 0, 0.2)'
        //     }); 
        // }
        // console.log('axios--------', store.getters.token, store.getters.projectcode )
        //给请求头加上token与project参数
        config.headers.authorization = `token `;
        config.headers.project = `code `;

        return config;
    },
    (error, b) => {
        // if(!res.config.noNotice) router.app.notice.error('请求失败，请重试或者与管理员联系！');
        // if (!res.config.noLoading && LoadingService) LoadingService.close();
        return Promise.reject(error);
    }
)
//响应拦截器
instance.interceptors.response.use(
    res => {
        if(res){
            if (!res.config.noLoading && LoadingService) LoadingService.close();
    
            if(res.data && res.data.errorCode === ERROR_CODE){
                let msg = (res.data?(res.data.message?res.data.message.resultMsg:res.data.errorMsg):'')||'请求失败，请重试或者与管理员联系！';
                
                if(!res.config.noNotice) router.app.notice.error(msg);
            }else if(res.data && res.data.errorCode === OVERTIME_CODE){
                if(!res.config.noNotice) router.app.notice.error(`用户登录已失效，请重新登录...`); 
                router.push({path:'/'});
            }else return res.data.data;
        }
    },
    error => {
        // router.app.notice.error('请求失败，请重试或者与管理员联系！');
        // if (LoadingService) LoadingService.close();
        return Promise.reject(error);
    }
)

export default instance