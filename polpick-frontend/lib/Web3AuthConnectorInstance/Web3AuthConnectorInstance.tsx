// Web3Auth Libraries
// import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
// import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
// import { Web3AuthNoModal } from "@web3auth/no-modal";
// import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
// import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
// import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";

// WAGMI Libraries
// import { Chain } from "wagmi/chains";

// Create Web3AuthConnector Instance
// export function Web3AuthConnectorInstance(web3AuthInstance: Web3AuthNoModal) {
//   return Web3AuthConnector({
//     web3AuthInstance,
//     loginParams: {
//       loginProvider: "google"
//     }
//   });
// }

// Create Web3Auth Instance
// export function Web3AuthInstance(chains: Chain[], appName: string) {
//   console.log("ss", `0x${chains[0].id.toString(16)}`);

//   const chainConfig = {
//     chainNamespace: CHAIN_NAMESPACES.EIP155,
//     chainId: `0x${chains[0].id.toString(16)}`,
//     rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
//     displayName: chains[0].name,
//     tickerName: chains[0].nativeCurrency?.name,
//     ticker: chains[0].nativeCurrency?.symbol,
//     blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string
//   };

//   const privateKeyProvider = new EthereumPrivateKeyProvider({
//     config: { chainConfig }
//   });

//   const web3AuthInstance = new Web3AuthNoModal({
//     clientId:
//       "BIrHsUJja0jDTNou9M1b65uswt0vK1sY8clFNY8Ql2j82aGrehC_tysBN9PhSxX_Z00--AXJWron3ok_CqXiDEc",
//     chainConfig,
//     privateKeyProvider,
//     uiConfig: {
//       appName,
//       defaultLanguage: "en",
//       logoLight: "https://web3auth.io/images/web3authlog.png",
//       logoDark: "https://web3auth.io/images/web3authlogodark.png",
//       mode: "light"
//     },
//     web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
//     enableLogging: true
//   });

//   const openloginAdapter = new OpenloginAdapter({
//     adapterSettings: {
//       uxMode: UX_MODE.REDIRECT
//     }
//   });

//   web3AuthInstance.configureAdapter(openloginAdapter);

//   const walletServicesPlugin: any = new WalletServicesPlugin({
//     walletInitOptions: {
//       whiteLabel: {
//         showWidgetButton: true
//       }
//     }
//   });
//   web3AuthInstance.addPlugin(walletServicesPlugin);

//   return web3AuthInstance;
// }

// // Web3Auth Libraries
// import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
// import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
// import { Web3AuthNoModal } from "@web3auth/no-modal";
// import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
// import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
// import { Chain } from "wagmi/chains";

// const name = "My App Name";
// const iconUrl = "https://web3auth.io/docs/contents/logo-ethereum.png";

// export default function Web3AuthConnectorInstance(chains: Chain[]) {
//   // Create Web3Auth Instance

//   const chainConfig = {
//     chainNamespace: CHAIN_NAMESPACES.EIP155,
//     chainId: `0x${chains[0].id.toString(16)}`,
//     rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
//     displayName: chains[0].name,
//     tickerName: chains[0].nativeCurrency?.name,
//     ticker: chains[0].nativeCurrency?.symbol,
//     blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string
//   };

//   const privateKeyProvider = new EthereumPrivateKeyProvider({
//     config: { chainConfig }
//   });

//   const web3AuthInstance = new Web3AuthNoModal({
//     clientId:
//       "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ",
//     privateKeyProvider,
//     web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET
//   });

//   // Add openlogin adapter for customisations
//   const openloginAdapterInstance = new OpenloginAdapter({
//     adapterSettings: {
//       uxMode: UX_MODE.REDIRECT,
//       whiteLabel: {
//         appName: name,
//         logoLight: iconUrl,
//         logoDark: iconUrl,
//         defaultLanguage: "en",
//         mode: "light" // whether to enable dark mode. defaultValue: false
//       }
//     }
//   });
//   web3AuthInstance.configureAdapter(openloginAdapterInstance);

//   return Web3AuthConnector({
//     web3AuthInstance,
//     loginParams: {
//       loginProvider: "google"
//     }
//   });
// }

// import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
// import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
// import { Web3AuthNoModal } from "@web3auth/no-modal";
// import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
// import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
// import { Chain } from "wagmi/chains";

// const name = "My App Name";
// const iconUrl = "https://web3auth.io/docs/contents/logo-ethereum.png";

// // Initialize variables to be exported
// let chainConfig;
// let privateKeyProvider;
// let web3AuthInstance;

// export default function Web3AuthConnectorInstance(chains: Chain[]) {
//   // Create Web3Auth Instance

//   chainConfig = {
//     chainNamespace: CHAIN_NAMESPACES.EIP155,
//     chainId: `0x${chains[0].id.toString(16)}`,
//     rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
//     displayName: chains[0].name,
//     tickerName: chains[0].nativeCurrency?.name,
//     ticker: chains[0].nativeCurrency?.symbol,
//     blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string
//   };

//   privateKeyProvider = new EthereumPrivateKeyProvider({
//     config: { chainConfig }
//   });

//   web3AuthInstance = new Web3AuthNoModal({
//     clientId:
//       "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ",
//     privateKeyProvider,
//     web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET
//   });

//   // Add openlogin adapter for customisations
//   const openloginAdapterInstance = new OpenloginAdapter({
//     adapterSettings: {
//       uxMode: UX_MODE.REDIRECT,
//       whiteLabel: {
//         appName: name,
//         logoLight: iconUrl,
//         logoDark: iconUrl,
//         defaultLanguage: "en",
//         mode: "light" // whether to enable dark mode. defaultValue: false
//       }
//     }
//   });
//   web3AuthInstance.configureAdapter(openloginAdapterInstance);

//   return Web3AuthConnector({
//     web3AuthInstance,
//     loginParams: {
//       loginProvider: "google"
//     }
//   });
// }

// // Export the variables
// export { chainConfig, privateKeyProvider, web3AuthInstance };

// Web3Auth Libraries
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Chain } from "wagmi/chains";

export default function Web3AuthConnectorInstance(chains: Chain[]) {
  // Create Web3Auth Instance
  const name = "My App Name";
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: `0x${chains[0].id.toString(16)}`,
    rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: chains[0].name,
    tickerName: chains[0].nativeCurrency?.name,
    ticker: chains[0].nativeCurrency?.symbol,
    blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig }
  });

  const web3AuthInstance = new Web3AuthNoModal({
    clientId:
      "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ",
    chainConfig,
    privateKeyProvider,
    uiConfig: {
      appName: name,
      defaultLanguage: "en",
      logoLight: "https://web3auth.io/images/web3authlog.png",
      logoDark: "https://web3auth.io/images/web3authlogodark.png",
      mode: "light"
    },
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    enableLogging: true
  });

  const openloginAdapter = new OpenloginAdapter({
    adapterSettings: {
      uxMode: UX_MODE.POPUP
    }
  });

  web3AuthInstance.configureAdapter(openloginAdapter);

  const walletServicesPlugin = new WalletServicesPlugin({
    walletInitOptions: {
      whiteLabel: {
        showWidgetButton: true
      }
    }
  });
  web3AuthInstance.addPlugin(walletServicesPlugin);

  return Web3AuthConnector({
    web3AuthInstance,
    loginParams: {
      loginProvider: "google"
    }
  });
}
