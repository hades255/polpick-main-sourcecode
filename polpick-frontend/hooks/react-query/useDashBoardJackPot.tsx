import { getWeeklyJackpotstats } from "@/api/functions/game.api";
import { useQuery } from "@tanstack/react-query";

const useDashBoardJackPot = () => {
  const jackpotstats = useQuery({
    queryKey: ["weeklyjackpotstats"],
    queryFn: getWeeklyJackpotstats
  });

  return {
    jackpotstats
  };
};

export default useDashBoardJackPot;
