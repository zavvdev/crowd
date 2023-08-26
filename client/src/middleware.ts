import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { FALLBACK_LNG, LANGUAGES } from '~/presentation/i18n/config';

acceptLanguage.languages(Object.values(LANGUAGES));

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

const cookieName = 'i18next';

export function middleware(req: NextRequest) {
  let lng;

  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }

  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  }

  if (!lng) {
    lng = FALLBACK_LNG;
  }

  if (
    !Object.values(LANGUAGES).some((loc) =>
      req.nextUrl.pathname.startsWith(`/${loc}`),
    ) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
    );
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '');
    const lngInReferer = Object.values(LANGUAGES).find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );

    const response = NextResponse.next();

    if (lngInReferer) {
      response.cookies.set(cookieName, lngInReferer);
    }

    return response;
  }

  return NextResponse.next();
}
