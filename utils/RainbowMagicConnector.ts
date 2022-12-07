import { MagicAuthConnector } from "@everipedia/wagmi-magic-connector";

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
        headerText: "Login to your account",
        isDarkMode: true,
        callbackUrl: "/dashboard", //optional
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
