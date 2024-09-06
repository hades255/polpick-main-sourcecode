import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { createContext, useContext } from "react";
// import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";
import { WagmiProvider, createConfig, http } from "wagmi"; //createConfig, http
import { base } from "wagmi/chains";
// 1. Get projectId at https://cloud.walletconnect.com
import { coinbaseWallet, walletConnect } from "wagmi/connectors"; // injected,

export const projectId = process.env.NEXT_APP_WALLET_CONNECT_PROJECT_ID!;

// 0. Setup queryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 0
      // networkMode: 'offlineFirst'
    }
  }
});

// 2. Create wagmiConfig
const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};

const chains = [base] as const; //polygon, sepolia, polygonAmoy,

// export const walletConfig = defaultWagmiConfig({
//   chains, // required
//   projectId: projectId!, // required
//   metadata, // required
//   enableWalletConnect: true, // Optional - true by default
//   enableInjected: true, // Optional - true by default
//   enableEIP6963: true, // Optional - true by default
//   enableCoinbase: true // Optional - true by default

//   // ...wagmiOptions, // Optional - Override createConfig parameters
// });

// // 3. Create modal

// export const walletConfig = createConfig({
//   chains,

//   connectors: [
//     walletConnect({
//       projectId
//     }),

//     injected({
//       shimDisconnect: true,
//       target: {
//         provider: "isMetaMask",
//         name: "metaMask",
//         id: "metaMask",
//         icon: ""
//       }
//     }),

//     injected({
//       shimDisconnect: true,
//       target: {
//         provider: "isBitKeep",

//         name: "BitKeep",
//         id: "BitKeep",
//         icon: ""
//       }
//     }),
//     injected({ target: "trustWallet", shimDisconnect: true }),
//     injected({ target: "okxWallet", shimDisconnect: true }),
//     injected({ target: "bitKeep", shimDisconnect: true })
//   ], //[injected(), walletConnect({ projectId }), safe()], // metaMask(),
//   transports: {
//     [polygon.id]: http(),
//     [sepolia.id]: http(),
//     [polygonAmoy.id]: http()
//   }
//   // syncConnectedChain: false,
//   // storage: null,
//   // ssr: true,
//   // multiInjectedProviderDiscovery: false
// });

export const Web3AuthContext = createContext<Web3AuthNoModal | null>(null);
export const useWeb3Auth = () => useContext(Web3AuthContext);

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: `0x${chains[0].id.toString(16)}`,
  rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
  displayName: chains[0].name,
  tickerName: chains[0].nativeCurrency?.name,
  ticker: chains[0].nativeCurrency?.symbol,
  blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string
};

const name = "PolPick";
const iconUrl = "https://web3auth.io/docs/contents/logo-ethereum.png";
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig }
});

export const web3AuthInstance = new Web3AuthNoModal({
  clientId: process.env.NEXT_APP_WEB3_CLIENT_ID_PROD!,
  // process.env.NODE_ENV === "development"
  //   ? process.env.NEXT_APP_WEB3_CLIENT_ID!
  //   : process.env.NEXT_APP_WEB3_CLIENT_ID_PROD!,

  privateKeyProvider,
  web3AuthNetwork:
    process.env.NODE_ENV === "development"
      ? WEB3AUTH_NETWORK.SAPPHIRE_DEVNET
      : WEB3AUTH_NETWORK.SAPPHIRE_MAINNET
  // WEB3AUTH_NETWORK.SAPPHIRE_DEVNET
  //  WEB3AUTH_NETWORK.SAPPHIRE_MAINNET
});

const openloginAdapterInstance = new OpenloginAdapter({
  adapterSettings: {
    uxMode: UX_MODE.POPUP,
    whiteLabel: {
      appName: name,
      logoLight: iconUrl,
      logoDark: iconUrl,
      defaultLanguage: "en",
      mode: "light" // whether to enable dark mode. defaultValue: false
    }
  }
});
web3AuthInstance.configureAdapter(openloginAdapterInstance);

export const walletConfig = createConfig({
  chains,
  transports: {
    // [polygon.id]: http(),
    // [sepolia.id]: http(),
    // [polygonAmoy.id]: http(),
    [base.id]: http()
  },
  connectors: [
    // Web3AuthConnectorInstance([chains]) ,
    coinbaseWallet(),
    walletConnect({
      projectId
    }),

    // Web3AuthConnectorInstance([base]),
    Web3AuthConnector({
      loginParams: { loginProvider: "google" },
      web3AuthInstance
    }) as any

    // injected({ target: "metaMask", shimDisconnect: true }),
    // injected({ target: "trustWallet", shimDisconnect: true })
    // injected({
    //   target: {
    //     id: "com.trustwallet.app",
    //     name: "Trust Wallet2",
    //     icon: "",
    //     provider: "isTrustWallet"
    //   },
    //   shimDisconnect: true
    // })
  ]
});

createWeb3Modal({
  termsConditionsUrl: "www.example.com",
  privacyPolicyUrl: "www.example.com",

  wagmiConfig: walletConfig,
  projectId: projectId!,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
  // themeMode: "" // Optional - defaults to "light"
  // includeWalletIds: [
  //   // "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96"
  // ],
  // featuredWalletIds: [injected({ target: "metaMask" }).toString()]
});

export function WalletWrapper({ children }: any) {
  // useEffect(() => {
  //   const initWeb3Auth = async () => {
  //     try {
  //       await web3AuthInstance.init();
  //       console.log("Web3Auth initialized");
  //     } catch (error) {
  //       console.error("Failed to initialize Web3Auth", error);
  //     }
  //   };

  //   initWeb3Auth();
  // }, []);
  return (
    <Web3AuthContext.Provider value={web3AuthInstance}>
      <WagmiProvider config={walletConfig}>
        {" "}
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </Web3AuthContext.Provider>
  );
}
