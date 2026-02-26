"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";
import { fetchLogin } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import Cookies from "js-cookie"; // 引入 js-cookie 库用于操作 cookie

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // 记录密码错误次数
    const [failCount, setFailCount] = useState(0);
    const FAIL_THRESHOLD = 3; // 错误次数达到阈值后显示找回密码

    const setAuth = useAuthStore((state) => state.setAuth);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // 自动读取当前环境的 API 地址
            // const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

            // const res = await fetch(`${baseUrl}/api/Auth/login`, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ email, password }),
            // });

            // if (res.ok) {
            //     const data = await res.json();
            //     localStorage.setItem("token", data.token); // ← 保存 token
            //     setFailCount(0); // 登录成功重置错误次数
            //     router.push("/");          // 登录成功 → 跳转首页
            // } else {
            //     const data = await res.json().catch(() => ({}));
            //     setFailCount((prev) => prev + 1); // ← 每次失败 +1
            //     setError(data?.message || "登录失败");
            // }

            const data = await fetchLogin({ email, password });

            // 登录成功，处理 Token
            // localStorage.setItem("token", data.token);

            // 调用 setAuth 后，token 会存入 localStorage 且 Axios 拦截器能立即读取
            setAuth(data.token, data.user);

            Cookies.set("auth-token", data.token, { expires: 1, path: "/" }); // 可选：设置 cookie，path="/" 使其在整个站点可用

            // 跳转到仪表盘或首页
            router.push("/dashboard");

        } catch (err: any) {
            // 这里拿到的 err.message 就是你在 axios 拦截器里定义的错误文本
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50">
            <form
                onSubmit={handleLogin}
                className="flex w-80 flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg"
            >
                <h1 className="text-center text-2xl font-semibold">登录</h1>

                <input
                    type="text"
                    placeholder="邮箱"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
                />
                <input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
                />

                {/* 错误提示 */}
                {/* {error && (
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-red-500">{error}</p>
                        
                        {failCount >= FAIL_THRESHOLD && (
                            <button
                                type="button"
                                onClick={() => router.push("/reset-password")}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                找回密码
                            </button>
                        )}
                    </div>
                )} */}

                {error && (
                    <div className="flex flex-col gap-1 whitespace-pre-line">
                        <ErrorMessage
                            message={error}
                            color="text-red-500"
                        />

                        {failCount >= FAIL_THRESHOLD && (
                            <button
                                type="button"
                                onClick={() => router.push("/reset-password")}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                找回密码
                            </button>
                        )}
                    </div>
                )
                }

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "登录中..." : "登录"}
                </button>

                {/* 登录失败后显示跳转注册的入口 */}
                <p className="text-center text-sm text-zinc-500">
                    没有账号？{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/register")}
                        className="text-blue-600 hover:underline"
                    >
                        立即注册
                    </button>
                </p>

                <button
                    type="button"
                    onClick={() => router.push("/userList")}
                    className="rounded-lg bg-blue-600 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50">
                    用户列表
                </button>
            </form >
        </div >
    );
}