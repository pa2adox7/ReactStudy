"use client";

import StatCard from "../components/StatCard"; // 引入子组件

export default function DashboardPage() {
    // 父组件的状态
    const userCount = 128;

    // 父组件定义的逻辑函数
    const handleSeeMore = () => {
        alert("父组件收到了点击，正在准备跳转...");
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-6">管理后台</h1>

            {/* 3. 使用组件并传递 Props */}
            <div className="flex gap-4 mb-8">
                {/* 传递字符串、数字和函数 */}
                <StatCard
                    title="总用户数"
                    value={userCount}
                    color="text-blue-600"
                    onDetailClick={handleSeeMore}
                />

                <StatCard
                    title="今日新增"
                    value={12}
                    color="text-green-600"
                    onDetailClick={() => console.log("点击了新增统计")}
                />
            </div>

            {/* 下面是你之前的表格代码... */}
        </div>
    );
}