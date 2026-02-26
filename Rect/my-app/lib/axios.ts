import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 从环境变量中读取 API 基础 URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
apiClient.interceptors.request.use(
    (config) => {
        // 从localStorage获取token
        // const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        // 直接从 Zustand 的状态快照中获取最新的 token
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => { Promise.reject(error) }
);

// 响应拦截器
apiClient.interceptors.response.use(
    (response) => {
        // 直接返回数据部分
        return response.data;
    },
    (error) => {
        let message = '发生未知错误';
        // 统一错误处理
        if (error.response) {
            const serverMessage = error.response.data?.message || error.response.data?.Message;

            if (serverMessage) {
                message = serverMessage.replaceAll('\\n', '\n'); // 处理服务器返回的换行符
            } else {
                // 如果没有具体消息，则根据状态码进行兜底处理
                switch (error.response.status) {
                    case 401:
                        message = '未授权，请重新登录';
                        break;
                    case 403:
                        message = '权限不足，拒绝访问';
                        break;
                    case 404:
                        message = '请求的资源不存在';
                        break;
                    case 500:
                        message = '服务器内部错误，请稍后重试';
                        break;
                    default:
                        message = `请求失败: ${error.response.statusText || error.response.status}`;
                }
            }
        } else if (error.request) {
            // 请求已发出，但没有收到响应（如网络断开）
            message = "网络异常，未收到服务器响应";
        } else {
            // 设置请求时触发的错误
            message = error.message;
        }
        return Promise.reject(new Error(message));
    }
);

export default apiClient;