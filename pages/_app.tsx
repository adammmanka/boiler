// import the styles for tailwind && RainbowKit (Wallet Connector for WAGMI_CLIENT)
import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

// Get the AppProps
import type { AppProps } from 'next/app'
import { themeChange } from "theme-change";

// Import the Wallet Providers && Wallets
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme, Wallet
} from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

// Connect Magiclink (Email <> Web3) connector for web2 experience in web3
import { rainbowMagicConnector } from "../utils/RainbowMagicConnector";

// import the providers for wagmi ethdata
import { WagmiConfig, createClient, allChains, configureChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// API AND Route providers for client side queries/api data
import { SWRConfig } from "swr";
import Axios from 'axios';

// import state manager
import { useEffect, useState } from "react";
import Layout from "../components/layout"



const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID || "";
const S3_BUCKET_URL = process.env.S3_BUCKET_URL || "united-io-playground-nfts";
const NEXT_PRIVATE_MAGIC_LINK_SK = process.env.NEXT_PRIVATE_MAGIC_LINK_SK;
const NEXT_PUBLIC_MAGIC_LINK_PK = process.env.NEXT_PUBLIC_MAGIC_LINK_PK;
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

const { chains, provider, webSocketProvider } = configureChains(allChains, [
  alchemyProvider({ apiKey: alchemyId }),
  publicProvider(),
]);

const customConnectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [rainbowMagicConnector({ chains }) as unknown as Wallet],
  },
]);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      // ... other wallets connectors
      injectedWallet({ chains }),
      rainbowWallet({ chains }),
      metaMaskWallet({ chains }),
      coinbaseWallet({ chains, appName: "free.army" }),
      walletConnectWallet({ chains }),
      // rainbowMagicConnector({ chains }),
    ],
  },
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: () => {
    return [...customConnectors(), ...connectors()];
  },
  provider,
  // connectors,
  webSocketProvider,
});


export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);
  
  return (
    <SWRConfig value={options}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Layout>
            <Component {...pageProps} />
          </Layout>  
        </RainbowKitProvider>
      </WagmiConfig>
    </SWRConfig>
  );
}
