import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { Socket, io } from "socket.io-client";

// Define the type for the socket context value
interface SocketContextValue {
  gameSocket: Socket | null;
  globalSocket: Socket | null;
  tradeGraphSocket: Socket | null;
}

// Create the context with an initial value
const SocketContext = createContext<SocketContextValue>({
  gameSocket: null,
  globalSocket: null,
  tradeGraphSocket: null
});

export const useSockets = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [gameSocket, setGameSocket] = useState<Socket | null>(null);
  const [globalSocket, setGlobalSocket] = useState<Socket | null>(null);
  const [tradeGraphSocket, setTradeGraphSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const gameSocketInstance = io("wss://polpick-game.dedicateddevelopers.us", {
      forceNew: true,
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      transports: ["websocket"]
    });
    const globalSocketInstance = io(
      "wss://polpick-admin.dedicateddevelopers.us",
      {
        forceNew: true,
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        transports: ["websocket"]
      }
    );
    const tradeGraphSocketInstance = io(
      "wss://polpick-trading.dedicateddevelopers.us",
      {
        forceNew: true,
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        transports: ["websocket"]
      }
    );

    setGameSocket(gameSocketInstance);
    setGlobalSocket(globalSocketInstance);
    setTradeGraphSocket(tradeGraphSocketInstance);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        gameSocketInstance.disconnect();
        globalSocketInstance.disconnect();
        tradeGraphSocketInstance.disconnect();
      } else {
        gameSocketInstance.connect();
        globalSocketInstance.connect();
        tradeGraphSocketInstance.connect();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      gameSocketInstance.close();
      globalSocketInstance.close();
      tradeGraphSocketInstance.close();
    };
  }, []);

  const memoizedValue = useMemo(
    () => ({ gameSocket, globalSocket, tradeGraphSocket }),
    [gameSocket, globalSocket, tradeGraphSocket]
  );

  return (
    <SocketContext.Provider value={memoizedValue}>
      {children}
    </SocketContext.Provider>
  );
};
