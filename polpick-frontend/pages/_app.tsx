/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
import EventListeners from "@/components/EventListener/EventListener";
import use15SecTimer from "@/hooks/utils/use15SecTimer";
import { ToggleContext } from "@/hooks/utils/useSideToggleContext";
import { WalletWrapper } from "@/layout/WalletWrapper/WalletWrapper";
import { checkWindow } from "@/lib/functions/_helpers.lib";
import { store } from "@/reduxtoolkit/store/store";
import "@/styles/global.scss";
import MuiThemeProvider from "@/themes/MuiThemeProvider";
import createEmotionCache from "@/themes/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Socket, io } from "socket.io-client";
import { Toaster } from "sonner";

/**
 * It suppresses the useLayoutEffect warning when running in SSR mode
 */
function fixSSRLayout() {
  // suppress useLayoutEffect (and its warnings) when not running in a browser
  // hence when running in SSR mode
  if (!checkWindow()) {
    React.useLayoutEffect = () => {
      // console.log("layout effect")
    };
  }
}

export interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();
//https://polpick-game.dedicateddevelopers.us/ Shubhadip Game Microservice

// wss://polpick-game.dedicateddevelopers.us
// wss://polpick-admin.dedicateddevelopers.us
// wss://polpick-trading.dedicateddevelopers.us
export const GameSocket: Socket = io(
  process.env.NEXT_APP_GAME_SOCKET!,
  // "wss://polpick-game.dedicateddevelopers.us",
  {
    forceNew: true,
    // reconnectionDelayMax: 500,
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    // retries: 2,
    transports: ["websocket"] // "polling"
    // forces websockets only
  }
);

export const GlobalSocket: Socket = io(
  process.env.NEXT_APP_ADMIN_SOCKET!,
  // "wss://polpick-admin.dedicateddevelopers.us",
  {
    forceNew: true,
    // reconnectionDelayMax: 500,
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    // retries: 2,
    transports: ["websocket"] // "polling"
    // forces websockets only
  }
);

export const TradeGraphSocket: Socket = io(
  process.env.NEXT_APP_TRADING_SOCKET!,
  // "wss://polpick-trading.dedicateddevelopers.us",
  {
    forceNew: true,

    // reconnectionDelayMax: 500,
    autoConnect: true,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    // retries: 2,
    transports: ["websocket"] // "polling"
    // forces websockets only
  }
);

export default function CustomApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: CustomAppProps) {
  fixSSRLayout();

  useEffect(() => {
    // Listen for when the page is visible, if the user switches tabs
    // and makes our tab visible again, re-fetch the session.
    const visibilityHandler = () => {
      if (document.visibilityState === "visible") {
        GlobalSocket && GlobalSocket.connect();
        GameSocket && GameSocket.connect();
        TradeGraphSocket && TradeGraphSocket.connect();
      } else {
        GlobalSocket && GlobalSocket.disconnect();
        GameSocket && GameSocket.disconnect();
        // TradeGraphSocket && TradeGraphSocket.disconnect();
      }
    };
    document.addEventListener("visibilitychange", visibilityHandler, false);
    return () =>
      document.removeEventListener(
        "visibilitychange",
        visibilityHandler,
        false
      );
  }, []);

  use15SecTimer();
  // useUser();
  // useTimer();
  // useSocket();

  // useGlobalGameAPI();
  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     console.log("THIS");

  //     navigator.serviceWorker
  //       .register("/serverTimer.worker.ts")
  //       .then(async (registration) => {
  //         console.log("scope is: ", registration.scope);
  //         const _registration = await navigator.serviceWorker.ready;
  //         console.log("_registration ", _registration);
  //       });
  //   }
  // }, []);
  return (
    <Provider store={store}>
      <WalletWrapper>
        <ToggleContext>
          <CacheProvider value={emotionCache}>
            <MuiThemeProvider>
              <CssBaseline />
              <Toaster richColors position="bottom-left" />

              <EventListeners />
              <Component {...pageProps} />
            </MuiThemeProvider>
          </CacheProvider>
        </ToggleContext>
      </WalletWrapper>
    </Provider>
  );
}

/* Getting the current user from the server and passing it to the client. */
CustomApp.getInitialProps = async (context: AppContext) => {
  // // const client = initializeApollo({ headers: context.ctx.req?.headers });

  // // resetServerContext();
  const appProps = await App.getInitialProps(context);
  // return { user: data?.authenticatedItem, ...appProps };

  return { ...appProps };
};
