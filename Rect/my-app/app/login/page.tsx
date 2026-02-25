"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ErrorMessage from "../components/ErrorMessage";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // 记录密码错误次数
    const [failCount, setFailCount] = useState(0);
    const FAIL_THRESHOLD = 3; // 错误次数达到阈值后显示找回密码

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // 自动读取当前环境的 API 地址
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

            const res = await fetch(`${baseUrl}/api/Auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("token", data.token); // ← 保存 token
                setFailCount(0); // 登录成功重置错误次数
                router.push("/");          // 登录成功 → 跳转首页
            } else {
                const data = await res.json().catch(() => ({}));
                setFailCount((prev) => prev + 1); // ← 每次失败 +1
                setError(data?.message || "登录失败");
            }
        } catch {
            setError("无法连接服务器");
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
                    <div className="flex flex-col gap-1">
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