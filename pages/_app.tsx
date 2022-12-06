import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app'

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';

import {
  injectedWallet,
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';

import { rainbowMagicConnector } from "../utils/RainbowMagicConnector";


import { WagmiConfig, createClient, allChains, configureChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID || "";
const S3_BUCKET_URL = process.env.S3_BUCKET_URL || "united-io-playground-nfts";
const NEXT_PRIVATE_MAGIC_LINK_SK = process.env.NEXT_PRIVATE_MAGIC_LINK_SK;
const NEXT_PUBLIC_MAGIC_LINK_PK = process.env.NEXT_PUBLIC_MAGIC_LINK_PK;

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
  
  return (
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
  );
}
