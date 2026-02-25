"use client";

// 1. 定义接口：规定父组件必须传哪些数据进来 (类似 .NET 的 DTO 或 Interface)
interface StatCardProps {
    title: string;       // 卡片标题
    value: number;       // 显示的数字
    color: string;       // 颜色（比如 "text-blue-600"）
    onDetailClick: () => void; // 一个函数：当点击“查看详情”时通知父组件
}

// 2. 组件通过参数接收 props
export default function StatCard({ title, value, color, onDetailClick }: StatCardProps) {
    return (
        <div className="p-4 bg-white rounded-xl shadow-md border w-64">
            <h3 className="text-zinc-500 text-sm">{title}</h3>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            
            <button 
                onClick={onDetailClick} // 调用父组件传进来的函数
                className="mt-2 text-xs text-blue-500 hover:underline"
            >
                查看详情 &rarr;
            </button>
        </div>
    );
}