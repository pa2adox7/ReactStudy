"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
    email: string;
    displayName: string;
}

export default function UserListPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            setError("");
            setLoading(true);

            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const res = await fetch(`${baseUrl}/api/Auth/userEmailList`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setUsers(data || []);
                } else {
                    setError("Failed to fetch users");
                }
            } catch (err) {
                setError("网络请求失败，请稍后重试");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50">
            <div className="flex w-80 flex-col gap-4 rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-center text-2xl font-semibold">用户列表</h1>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <ul>
                    {users.map((user) => (
                        <li key={user.email} className="border-b py-2">
                            <span className="font-medium">{user.displayName}</span>
                            <span className="ml-2 text-sm text-zinc-500">{user.email}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <button
                type="button"
                onClick={() => router.push("/")}
                className="absolute top-4 left-4 rounded-lg bg-gray-600 py-2 px-4 text-sm text-white hover:bg-gray-700 disabled:opacity-50">
                返回首页
            </button>
        </div>
    )
}