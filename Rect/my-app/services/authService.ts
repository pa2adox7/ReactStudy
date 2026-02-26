import apiClient from '../lib/axios';

interface User {
    email: string;
    displayName: string;
}

// 定义登录接口返回的数据结构
interface LoginResponse {
    token: string;
    user: {
        email: string;
        displayName: string;
    };
}

export const fetchUserList = (): Promise<User[]> => {
    return apiClient.get('/api/Auth/userEmailList');
};

// 封装登录方法
export const fetchLogin = async (credentials: { email: string; password: string }): Promise<LoginResponse> => {
    // 这里使用 apiClient.post，URL 需要根据你后端的路由修改
    return apiClient.post('/api/Auth/login', credentials);
};

// 注册用户方法
export const fetchRegister = async (data: { email: string; password: string; displayName: string }):Promise<Boolean> => {
    return apiClient.post('/api/Auth/register', data);
}

// 检查邮箱是否已被注册
export const fetchCheckEmail = async (email: string): Promise<boolean> => {
    return apiClient.get(`/api/Auth/checkUser?email=${encodeURIComponent(email)}`);
}

// 重置密码
export const fetchResetPassword = async(data:{email:string,password:string}):Promise<Boolean> => {
    return apiClient.post('/api/Auth/resetPassword', data);
}