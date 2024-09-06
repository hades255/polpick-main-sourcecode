import { getChangellyAvailableProviders } from "@/api/functions/changelly.api";
import { useQuery } from "@tanstack/react-query";

//currently not being used as the icons not matching per figma
const useChangellyProviders = () => {
  const changellyProviders = useQuery({
    queryKey: ["changellyProviders"],
    queryFn: getChangellyAvailableProviders
  });

  return {
    changellyProviders
  };
};

export default useChangellyProviders;
