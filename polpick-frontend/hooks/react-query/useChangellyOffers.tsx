import { getChangellyOffers } from "@/api/functions/changelly.api";
import { CountryInterface } from "@/interface/changelly.interfaces";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../redux/useAppSelector";

const useChangellyOffers = ({
  exchangeAmt = 0,
  selectedCountry,
  providers = ["moonpay", "banxa", "transak", "wert"]
}: {
  exchangeAmt: number;
  selectedCountry: CountryInterface | undefined;
  providers?: string[];
}) => {
  const userSelector = useAppSelector((state) => state.userSlice);
  const walletSelector = useAppSelector((state) => state.walletSlice);

  // const providers = ["moonpay", "banxa", "transak", "wert"]; //simplex

  const fetchOffers = async (provider: string) => {
    if (
      walletSelector?.wallet &&
      userSelector?.userData?._id &&
      selectedCountry &&
      exchangeAmt
    ) {
      return getChangellyOffers({
        amountFrom: JSON.stringify(exchangeAmt),
        currencyFrom: selectedCountry?.currency,
        currencyTo: "ETH",
        externalUserId: userSelector.userData._id,
        country: selectedCountry.code,
        state: selectedCountry.code === "US" ? "KS" : "",
        providerCode: provider
      });
    }
    return [];
  };

  const {
    data: allOffers,
    isLoading,
    error
  } = useQuery({
    queryKey: [
      "getOffers",
      exchangeAmt,
      selectedCountry,
      userSelector,
      walletSelector
    ],
    queryFn: async () => {
      const results = await Promise.all(
        providers.map((provider) => fetchOffers(provider))
      );
      return results.flat();
    },

    enabled:
      Boolean(exchangeAmt) &&
      Boolean(walletSelector?.wallet) &&
      Boolean(userSelector?.userData?._id) &&
      Boolean(selectedCountry)
  });

  return { allOffers, isLoading, error };
};

export default useChangellyOffers;
