import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['fr', 'en'],

    // Used when no locale matches
    defaultLocale: 'fr',

    // Use cookie to determine locale, do not prefix URL (keep /boutique, not /fr/boutique)
    localePrefix: 'never'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(fr|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
