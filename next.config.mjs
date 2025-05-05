/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["fa", "en", "fr", "ar"], // Add the languages you want to support
    defaultLocale: "fa", // Set the default locale (for example, English)
    localeDetection: false, // Disable automatic language detection if you want to manually control language routing
  },
};

export default nextConfig;
