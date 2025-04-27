// pages/_app.js
import { Fonts } from '@/components/base/global';
import { fetcher, useAxiosInterceptors } from "@/components/lib/api";
import { theme } from '@/components/theme';
import { ChakraProvider, useToast } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import '../styles/globals.css';

const AppWrapper = ({ Component, pageProps }) => {
  const toast = useToast();
  useAxiosInterceptors((options) => toast(options));
  return <Component {...pageProps} />;
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={{ fetcher }}>
        <AppWrapper Component={Component} pageProps={pageProps} />
      </SWRConfig>
      <Fonts />
    </ChakraProvider>
  )
}

export default MyApp