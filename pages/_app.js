// pages/_app.js
import { Fonts } from "@/components/base/global";
import { fetcher, useAxiosInterceptors } from "@/components/lib/api";
import { theme } from "@/components/theme";
import { ChakraProvider, useToast } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import "../styles/globals.css";
import i18n from "../i18n"; // Assuming i18n.js is in the root directory
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getTheme } from "@/components/theme";

const AppWrapper = ({ Component, pageProps }) => {
  const toast = useToast();
  useAxiosInterceptors((options) => toast(options));
  return <Component {...pageProps} />;
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const {locale} = router
  const theme = getTheme(locale || "en");

  const [isLanguageSet, setIsLanguageSet] = useState(false);

  useEffect(() => {
    // Ensure that the i18n language is set to match the Next.js router locale
    if (router.locale && i18n.language !== router.locale) {
      i18n.changeLanguage(router.locale).then(() => {
        setIsLanguageSet(true); // Set language, and enable rendering
      });
    } else {
      setIsLanguageSet(true); // Language is already correct, enable rendering
    }
  }, [router.locale]); // Re-run the effect when locale changes

  if (!isLanguageSet) {
    // Prevent rendering until the language is set properly
    return <div>Loading...</div>;
  }

  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={{ fetcher }}>
        <AppWrapper Component={Component} pageProps={pageProps} />
      </SWRConfig>
      <Fonts lang={locale || "en"}/>
    </ChakraProvider>
  );
}

export default MyApp;
