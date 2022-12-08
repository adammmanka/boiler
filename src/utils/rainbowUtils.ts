import { lightTheme, Theme } from '@rainbow-me/rainbowkit'
import { MagicAuthConnector } from "@everipedia/wagmi-magic-connector";
import merge from 'lodash.merge'

const NEXT_PUBLIC_MAGIC_LINK_PK =
  process.env.NEXT_PUBLIC_MAGIC_LINK_PK || "pk_live_60983F7FE4290119";

export const rainbowMagicConnector = ({ chains }: any) => ({
  id: "magic",
  name: "Magic",
  iconUrl: "./mglink-ico.png",
  iconBackground: "#fff",
  createConnector: () => {
    const connector = new MagicAuthConnector({
      chains,
      options: {
        apiKey: NEXT_PUBLIC_MAGIC_LINK_PK,
        accentColor: "#ff0000",
        customLogo: "./mglink-ico.png",
        // headerText: "Login to your account",
        isDarkMode: true,
        // callbackUrl: "/dashboard", //optional
        // network: {
        //   rpcUrl:
        //     "https://eth-mainnet.g.alchemy.com/v2/5tsd5GN171CXR8VF8PG5-xI3Lc2a3jvS", // your ethereum, polygon, or optimism mainnet/testnet rpc URL
        //   chainId: 1,
        // },
        magicSdkConfiguration: {
          network: {
            rpcUrl:
              "https://eth-mainnet.g.alchemy.com/v2/5tsd5GN171CXR8VF8PG5-xI3Lc2a3jvS", // your ethereum, polygon, or optimism mainnet/testnet rpc URL
            chainId: 1,
          },
        },
        // oauthOptions: {
        //   providers: ["google", "twitter", "discord"],
        // },
      },
    });
    return {
      connector,
    };
  },
});

const daisyTheme = (): Theme => {
  const myTheme = merge(
    lightTheme({
      overlayBlur: 'small',
    }),
    {
      colors: {
        accentColor: 'hsl(var(--p))',
        accentColorForeground: 'hsl(var(--pc))',
        actionButtonBorder: 'hsl(var(--b1))',
        actionButtonBorderMobile: 'hsl(var(--b1))',
        actionButtonSecondaryBackground: 'hsl(var(--b2))',
        closeButton: 'hsl(var(--bc))',
        closeButtonBackground: 'hsl(var(--b3))',
        connectButtonBackground: 'hsl(var(--b1))',
        connectButtonBackgroundError: '#FF494A',
        connectButtonInnerBackground: 'hsl(var(--b2))',
        connectButtonText: 'hsl(var(--bc))',
        connectButtonTextError: 'hsl(var(--erc))',
        connectionIndicator: 'hsl(var(--su))',
        error: 'hsl(var(--er))',
        generalBorder: 'hsl(var(--b3))',
        generalBorderDim: 'hsl(var(--p))',
        menuItemBackground: 'hsl(var(--b1))',
        //modalBackdrop: 'hsl(var(--s))',      => card border: hsl(var(--b2, var(--b1)) / var(--tw-border-opacity))
        modalBackground: 'hsl(var(--b1))',
        modalBorder: 'transparent',
        modalText: 'hsl(var(--bc))',
        modalTextDim: 'hsl(var(--pc))',
        modalTextSecondary: 'hsl(var(--p))',
        profileAction: 'hsl(var(--b3))',
        profileActionHover: 'rgba(99, 99, 99, 0.2)',
        profileForeground: 'hsl(var(--b1))',
        selectedOptionBorder: 'hsl(var(--b1))',
        standby: '#FFD641',
      },
      fonts: {
        body: 'var(font-family)',
      },
      radii: {
        actionButton: 'var(--rounded-box, 1rem)',
        connectButton: 'var(--rounded-box, 1rem)',
        menuButton: 'var(--rounded-box, 1rem)',
        modal: 'var(--rounded-box, 1rem)',
        modalMobile: 'var(--rounded-box, 1rem)',
      },
      shadows: {
        connectButton: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
        profileDetailsAction: '0px 2px 6px rgba(37, 41, 46, 0.04)',
        selectedOption: '0px 2px 6px rgba(0, 0, 0, 0.24)',
        selectedWallet: '0px 2px 6px rgba(0, 0, 0, 0.12)',
        walletLogo: '0px 2px 16px rgba(0, 0, 0, 0.16)',
      },
    } as Theme
  )

  return myTheme
}

export { daisyTheme }


