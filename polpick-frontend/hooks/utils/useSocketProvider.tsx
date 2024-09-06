// /* eslint-disable import/no-cycle */
// // import React, { createContext, useMemo, useState } from "react";

// import { setSocketID } from "@/reduxtoolkit/slices/socketSlice";
// import { store } from "@/reduxtoolkit/store/store";
// import { GlobalSocket } from "pages/_app";
// import { useEffect, useState } from "react";

// const useSocket = () => {
//   const [isConnected, setIsConnected] = useState(GlobalSocket.connected);

//   useEffect(() => {
//     GlobalSocket.on("connect", () => {
//       console.log("isConnected", isConnected);
//       if (GlobalSocket?.id) {
//         setIsConnected(true);
//         store.dispatch(setSocketID(GlobalSocket.id));
//       }
//     });

//     GlobalSocket.on("disconnect", () => {
//       store.dispatch(setSocketID(""));
//       setIsConnected(false);
//     });

//     GlobalSocket.on("reconnect", () => {
//       if (GlobalSocket?.id) {
//         setIsConnected(true);
//         store.dispatch(setSocketID(GlobalSocket.id));
//       }
//     });
//     return () => {
//       GlobalSocket.off("connect");
//       GlobalSocket.off("disconnect");
//       GlobalSocket.off("reconnect");
//     };
//   }, []);
//   console.log("GlobalSocket", GlobalSocket);

//   return { isConnected };
// };

// export default useSocket;
