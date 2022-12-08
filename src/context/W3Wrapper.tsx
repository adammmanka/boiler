// Import the Wallet Providers && Wallets
import {
    RainbowKitProvider,
    connectorsForWallets,
    Wallet
  } from '@rainbow-me/rainbowkit';
  import {
    injectedWallet,
    rainbowWallet,
    metaMaskWallet,
    coinbaseWallet,
    walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';


// import the providers for wagmi ethdata
import { WagmiConfig, createClient, allChains, configureChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

  // Connect Magiclink (Email <> Web3) connector for web2 experience in web3
import { rainbowMagicConnector, daisyTheme } from "@/utils/rainbowUtils";


const { chains, provider, webSocketProvider } = configureChains(allChains, [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID || ""}),
    publicProvider(),
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

const customConnectors = connectorsForWallets([
    {
    groupName: "Recommended",
    wallets: [rainbowMagicConnector({ chains }) as unknown as Wallet],
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

const theme = daisyTheme()

const W3Wrapper = ({ children }: any) => {
return (
    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider coolMode chains=    {chains} theme={theme}>
            <div>{children}</div>
        </RainbowKitProvider>
    </WagmiConfig>
)
}

export default W3Wrapper