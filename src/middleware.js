import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function middleware(request){
    const path = request.nextUrl.pathname;
    const publicPath = path === '/signin' || '/signup';
    const getCookies = cookies();
    const token = getCookies.get('token')?.value || '';

    if(publicPath && token !== ''){
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if (!publicPath && token === '') {
        return NextResponse.redirect(new URL('/signin', request.nextUrl));
    }
}

export const config = {
    matcher: ['/signin', '/signup'],
}