"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchResetPassword } from "@/services/authService";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);



    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            //     const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

            //     const res = await fetch(`${baseUrl}/api/Auth/resetPassword`, {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ email, password }),
            //     });

            //     if (res.ok) {
            //         const data = await res.json();
            //         alert("密码重置成功，请使用新密码登录");
            //         router.push("/login");
            //     } else {
            //         const errorData = await res.json();
            //         setError(errorData.message || "密码重置失败");
            //     }
            // }
            // catch {
            //     setError("无法连接服务器");
            const result = await fetchResetPassword({ email, password });
            alert("密码重置成功，请使用新密码登录");
            router.push("/login");
        } catch (err: any) {
            setError(err.message || "密码重置失败");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50">
            <form
                onSubmit={handleReset}
                className="flex w-80 flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg"
            >
                <h1 className="text-center text-2xl font-semibold">重置密码</h1>

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

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-blue-600 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? "重置中..." : "重置密码"}
                </button>
            </form>
        </div>
    );
}