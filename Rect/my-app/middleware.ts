import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value;
    const { pathname } = request.nextUrl;

    // 定义哪些路径需要登录后才能访问
    const protectedPaths = ['/dashboard', '/userList'];
    const isProtected = protectedPaths.some(path => pathname.startsWith(path));

    // 如果是受保护路径且没有 Token，重定向到首页或登录页
    if (isProtected && !token) {
        const url = request.nextUrl.clone();
        url.pathname = '/'; // 或者是 '/login'
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// 配置中间件匹配的路径范围，避免影响静态资源
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};