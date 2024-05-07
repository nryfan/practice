import axios from 'axios';

var baseURL =import.meta.env.VITE_API_URL

const service = axios.create({
baseURL: baseURL, // 设置基础URL
timeout: 5000, // 设置请求超时时间（以毫秒为单位）
});

service.interceptors.request.use(
	function (config) {
        let token = localStorage.getItem("token")
        
        if(token){
            // config
            config.headers = {
                Authorization:`Token ${token}`
            }
        }
		return config
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 可以在这里配置其他Axios选项，如请求拦截器、响应拦截器等

export default service;