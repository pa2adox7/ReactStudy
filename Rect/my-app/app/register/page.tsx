"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchRegister } from "@/services/authService";
import { fetchCheckEmail } from "@/services/authService";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // 邮箱检测状态
    const [emailChecking, setEmailChecking] = useState(false);
    const [emailStatus, setEmailStatus] = useState<"idle" | "available" | "taken">("idle");

    // 失去焦点时触发邮箱检测
    const handleEmailBlur = async () => {
        if (!email) return;
        setEmailChecking(true);
        setEmailStatus("idle");

        try {
            // const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            // const res = await fetch(`${baseUrl}/api/Auth/checkUser?email=${encodeURIComponent(email)}`);
            // if (res.ok) {
            //     const data = await res.json();
            //     // result: true → 已被注册，result: false → 可以使用
            //     setEmailStatus(data ? "available" : "taken");
            // }

            const result = await fetchCheckEmail(email);
            setEmailStatus(result ? "available" : "taken");

        } catch {
            // 检测失败不阻断注册流程
        } finally {
            setEmailChecking(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // 邮箱已被占用时阻止提交
        if (emailStatus === "taken") {
            setError("该邮箱已被注册，请更换邮箱或直接登录");
            return;
        }

        setError("");
        setLoading(true);

        try {
            //     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

            //     const res = await fetch(`${baseUrl}/api/Auth/register`, {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ email, password, displayName }),
            //     });

            //     if (res.ok) {
            //         router.push("/login");     // 注册成功 → 跳回登录
            //     } else {
            //         const data = await res.json().catch(() => ({}));
            //         setError(data?.message || "注册失败");
            //     }
            // } catch {
            //     setError("无法连接服务器");
            // }
            const result = await fetchRegister({ email, password, displayName });

            router.push("/login");     // 注册成功 → 跳回登录

        } catch (error: any) {
            setError(error.message || "注册失败");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50">
            <form
                onSubmit={handleRegister}
                className="flex w-80 flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg"
            >
                <h1 className="text-center text-2xl font-semibold">注册</h1>

                {/* 邮箱输入框 */}
                <div className="flex flex-col gap-1">
                    <input
                        type="email"
                        placeholder="邮箱"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailStatus("idle"); // 重新输入时重置状态
                        }}
                        onBlur={handleEmailBlur}    // ← 失去焦点触发检测
                        required
                        className={`rounded-lg border px-3 py-2 text-sm outline-none transition-colors
                            ${emailStatus === "taken" ? "border-red-400 focus:border-red-400" : ""}
                            ${emailStatus === "available" ? "border-green-400 focus:border-green-400" : ""}
                            ${emailStatus === "idle" ? "focus:border-blue-500" : ""}
                        `}
                    />
                    {/* 检测状态提示 */}
                    {emailChecking && (
                        <p className="text-xs text-zinc-400">检测中...</p>
                    )}
                    {!emailChecking && emailStatus === "available" && (
                        <p className="text-xs text-green-500">✓ 该邮箱可以使用</p>
                    )}
                    {!emailChecking && emailStatus === "taken" && (
                        <p className="text-xs text-red-500">
                            该邮箱已被注册，{" "}
                            <button
                                type="button"
                                onClick={() => router.push("/login")}
                                className="text-blue-600 hover:underline"
                            >
                                直接登录
                            </button>
                        </p>
                    )}
                </div>

                <input
                    type="text"
                    placeholder="昵称"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
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

                {error && <p className="text-sm text-red-500 whitespace-pre-line">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "注册中..." : "注册"}
                </button>

                <p className="text-center text-sm text-zinc-500">
                    已有账号？{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="text-blue-600 hover:underline"
                    >
                        返回登录
                    </button>
                </p>
            </form>
        </div>
    );
}