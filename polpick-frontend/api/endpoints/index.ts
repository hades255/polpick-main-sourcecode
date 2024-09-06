export const baseUrl = process.env.NEXT_APP_BASE_URL;
export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/api/`; // "10.2.0.114:1747/api/";
export const baseUrlMedia = process.env.NEXT_APP_BASE_URL;
export const baseUrlWeb = process.env.NEXT_APP_HOMEPAGE;
export const geckoBaseURLAPI = "https://api.coingecko.com/api/v3/";
export const coinBaseExchangeRateAPI = "https://api.coinbase.com/v2/";
export const countryBaseURL =
  "http://purecatamphetamine.github.io/country-flag-icons/3x2/";
// api doc => https://militarymoves-admin.dedicateddevelopers.us/apidoc

export const mediaUrl = (url: string) => {
  return `${baseUrlMedia}/uploads/${url}`;
};

export const endpoints = {
  coinGecko: {
    simplePrice: "/simple/price"
  },
  coinBase: {
    test: (currency: string) => `exchange-rates?currency=${currency}`
  },
  changelly: {
    buy: {
      create_changelly_payment: "/changelly/create-changelly-pay-payment",
      get_country_list: "/changelly/changelly-availability-countries",
      GetAvailableProviders: "/changelly/changelly-available-providers"
    },
    exchange: {
      GetCurrencyAll: "/changelly/get-currencies-all",
      GetExchangeAmount: "/changelly/get-exchange-amount",
      GetMinimumExchangeAmount: "/changelly/get-min-amount",
      GetMinMaxExchangeAmount: "/changelly/get-pair-params",
      CreteChangellyTransaction: "/changelly/create-transaction",
      GetPayOffers: "/changelly/changelly-pay-Offers"
    }
  },
  auth: {
    // signup: "user/existence",
    // signUpProfile: "user/signup",
    // login:"user/login",
    // profileDetails: "user/profile/get",
    // profileUpdate: "user/profile/update"
    create_wallet_user: "/user/create-wallet-user",
    update_user: "/user/update-profile"
  },
  game: {
    recentWins: "/game/recent-winners",
    topFiveWinners: "/game/top-five-winners",
    winRatioById: "/game/win-ratio",
    gameList: "/game/list",
    gameType: "/game/find-game"
  },
  misc: {
    chartInitialData: "/trading/prices",
    highrollers: "/highroller/list",
    weeklyWinnersHistory: "/weekly/list",
    weeklyjackpotcontenders: "/order/get-jackpot",
    weeklyjackpotstats: "weekly/jackpot-stats",
    jackpotlist: "weekly/jackpot-list"
  },
  affiliate: {
    affiliateList: "/affiliate-link/list",
    affiliatedStats: "/affiliate-link/stats",
    affiliateLinkCreate: "/affiliate-link/create-link",
    affiliateCreateUser: "/affiliate-link/create-user",
    affiliateCheckLink: "/affiliate-link/check-link",
    affiliateCheckValidLink: "/affiliate-link/check-link-affiliate",
    affiliateYearlyGraph: "affiliate-link/yearly-graph",
    affiliateWeeklyGraph: "affiliate-link/weekly-graph",
    affiliateHalfYearlyGraph: "/affiliate-link/half-yearly-graph",
    affiliateMonthlyGraph: "/affiliate-link/monthly-graph",
    affiliateDayWiseGraph: "/affiliate-link/day-wise-graph",
    affliateRegisterClick: "/affiliate-link/register-click"

    //  affiliateList:"/affiliate-link/list"
  },
  user: {
    orderList: "/order/list"
  },
  cms: {
    home: "/cms/home",
    about: "aboutpolicy/details",
    faq: "faq/all",
    faqCategory: "/faq/category/list",
    faqList: "/faq/list"
  }
};

export const sucessNotificationEndPoints = [endpoints.auth.create_wallet_user];
