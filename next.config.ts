import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',  // Enable static export for GitHub Pages
  basePath: '/kado-express-237', // Required for GitHub Pages project site
  images: {
    unoptimized: true, // Required for static export as Next.js Image Optimization needs a server
  },
  // Ensure trailing slashes for proper routing on GitHub Pages
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
