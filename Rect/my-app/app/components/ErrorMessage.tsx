"use client";

interface ErrorMessageProps {
    message: string;
    color: string;
}

export default function ErrorMessage({ message, color }: ErrorMessageProps) {
    return (
        <div className={`p-4 bg-white rounded-xl shadow-md border w-full ${color}`}>
            <p className={`text-sm font-bold`}>{message}</p>
        </div>
    );
}