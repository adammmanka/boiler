// import the styles for tailwind 
import '@/styles/globals.css'
// import state manager
import React, { useEffect, useState } from "react";
// Get the AppProps
import type { AppProps } from 'next/app'
// API AND Route providers for client side queries/api data
import { SWRConfig } from "swr";
import Axios from 'axios';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client'
// css for RainbowKit (Wallet Connector for WAGMI_CLIENT)
import '@rainbow-me/rainbowkit/styles.css';

//providers and components
import { ThemeProvider } from 'next-themes';
import W3Wrapper from '@/context/W3Wrapper';
import Layout from "@/components/Layout";

//apollo


const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  cache: new InMemoryCache(),
});




//AXIOS && SWRCONFIG OPTIONS 

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/api";
Axios.defaults.withCredentials = true;

const fetcher = async (url: string) => {
  try {
    const res = await Axios.get(url);
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

const options = {
  refreshInterval: 3000,
  fetcher,
  dedupingInterval: 10000,
}


export default function App({ Component, pageProps }: AppProps) {

  // suppress useLayoutEffect warnings when running outside a browser
  if (!typeof window) React.useLayoutEffect = useEffect


  return (
    <SWRConfig value={options}>
      <ThemeProvider themes={['light', 'dark', 'cupcake', 'lofi', 'cyberpunk']}>
        <W3Wrapper>
          <ApolloProvider client={client}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </W3Wrapper>  
      </ThemeProvider>
    </SWRConfig>
  );
}
