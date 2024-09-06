// /* eslint-disable import/no-cycle */
// import { getGameType } from "@/api/functions/game.api";
// import { store } from "@/reduxtoolkit/store/store";
// import { useQuery } from "@tanstack/react-query";

// const useGameHook = () => {
//   const gameSelector = store.getState().gameSlice;

//   const { data: faq } = useQuery({
//     enabled: Boolean(gameSelector?.gameType),
//     queryKey: ["getGameType", gameSelector?.gameType],
//     queryFn: () => getGameType({ gameType: gameSelector?.gameType })
//   });

//   return {
//     faq
//   };
// };

// export default useGameHook;
