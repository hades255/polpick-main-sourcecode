/* eslint-disable no-plusplus */
/* eslint-disable import/no-cycle */
import { countryBaseURL } from "@/api/endpoints";
import {
  AffliateDailyData,
  AffliateMonthlyData,
  AffliateWeeklyData,
  AffliateYearlyData
} from "@/api/functions/game.api";
import { filterType } from "@/components/DashboardChartSec/DashboardChartSec";
import {
  monthsLibrary,
  walletDeepLinks,
  weeksLibrary
} from "@/config/constants";
import { BaseApiResponse } from "@/interface/common.interface";
import assest from "@/json/assest";
import events from "@/json/events/events";
import { AxiosError, AxiosResponse } from "axios";
import { hasFlag } from "country-flag-icons";
import eventEmitter from "services/event.emitter";

/**
 * Check if the window object exists.
 * @returns A function that checks if the window is undefined.
 */
export function checkWindow() {
  return typeof window !== "undefined";
}

export function isInServer() {
  return typeof document === "undefined";
}

export function isApple() {
  if (typeof navigator === "undefined") {
    return false;
  }
  const platformExpression = /Mac|iPhone|iPod|iPad/i;
  const agent = navigator.userAgent;
  return platformExpression.test(agent);
}

export function isAppleSafari() {
  if (typeof navigator === "undefined") {
    return false;
  }
  const rejectedExpression = /Chrome|Android|CriOS|FxiOS|EdgiOS/i;
  const expectedExpression = /Safari/i;

  const agent = navigator.userAgent;
  if (rejectedExpression.test(agent)) {
    return false;
  }
  return isApple() && expectedExpression.test(agent);
}

export const globalCatchSucess = (response: AxiosResponse<BaseApiResponse>) => {
  let message = "Something went wrong";
  if (response?.data?.message) {
    message = response?.data.message;
  }
  eventEmitter.emit(events.showNotification, {
    message,
    options: { variant: "success" }
  });
};

export const globalCatchWarning = (
  response: AxiosResponse<BaseApiResponse>
) => {
  let message = "Something went wrong";
  if (response?.data?.message) {
    message = response?.data.message;
  }

  eventEmitter.emit(events.showNotification, {
    message,
    options: { variant: "warning" }
  });
};

export const globalCatchError = (error: AxiosError<BaseApiResponse>) => {
  let message = "Something went wrong";
  if (error.response?.data?.message) {
    message = error.response?.data.message;
  }
  eventEmitter.emit(events.showNotification, {
    message,
    options: { variant: "error" }
  });
};

export const addElipsisBetweenLength = (
  input: string,
  prefixLength: number = 6,
  suffixLength: number = 6
) => {
  if (input.length <= prefixLength + suffixLength) {
    return input;
  } else {
    const prefix = input.substring(0, prefixLength);
    const suffix = input.substring(input.length - suffixLength);
    return `${prefix}...${suffix}`;
  }
};

export const formatChatTime = (timestamp: number): string => {
  // Convert UNIX timestamp to milliseconds
  const date = new Date(timestamp);

  // Get hours, minutes, and seconds
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // const seconds = date.getSeconds();

  // Format the time string
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`; //:${seconds.toString().padStart(2, "0")}

  return formattedTime;
};

// export function encryptData(value: string) {
//   return AES.encrypt(value, process.env.NEXT_APP_ENCR_KEY);
// }

// export function decryptData(value: CryptoJS.lib.CipherParams) {
//   return AES.decrypt(value, process.env.NEXT_APP_ENCR_KEY).toString(enc.Utf8);
// }
const serviceAmt = 0.11;
export const getROI = (tot_amt: number, betAmt: number, againstAmt: number) => {
  return tot_amt
    ? (againstAmt - againstAmt * serviceAmt) *
        (betAmt / (tot_amt - tot_amt * serviceAmt))
    : betAmt;
};

export const getIcon = (i: number) => {
  if (i === 1) {
    return `${assest.fillGoldCrown}`;
  }
  if (i === 2) {
    return `${assest.fillSilverCrown}`;
  }
  if (i === 3) {
    return `${assest.fillBronzeCrown}`;
  }
  if (i === 4) {
    return `${assest.OutLineGreenCrown}`;
  }
  if (i === 5) {
    return `${assest.OutLineGreyCrown}`;
  }
  return `${assest.OutLineGreyCrown}`;
};
export const getTimerText = (val: number) => {
  return val > 9 ? val : `0${val}`;
};

export const getDebounced = (
  value: string | number,
  delay: number
): Promise<string | number> => {
  return new Promise<string | number>((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, delay);
  });
};

export const createDebouncedFunction = (
  callback: (value: string) => void,
  delay: number
): ((value: string) => void) => {
  // eslint-disable-next-line init-declarations
  let timeoutId: ReturnType<typeof setTimeout>;

  return (value: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      callback(value);
    }, delay);
  };
};

export const getFlag = (country: string) => {
  return hasFlag(country)
    ? `${countryBaseURL}${country}.svg`
    : `${countryBaseURL}GB.svg`;
};

export const isMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export const getDeepLink = (
  _wallet:
    | "MetaMask"
    | "Trust Wallet"
    | "Coinbase Wallet"
    | "OKX Wallet"
    | "Bitget Wallet"
    | string,
  dappUrl: string
) => {
  switch (_wallet) {
    case "MetaMask":
      return `${walletDeepLinks.metaMask}${dappUrl}`;
    case "Trust Wallet":
      return `${walletDeepLinks.trustWallet}${dappUrl}`;
    case "Coinbase Wallet":
      return `${walletDeepLinks.coinBase}${dappUrl}`;
    case "OKX Wallet":
      return `${walletDeepLinks.okxWallet}${dappUrl}`;
    case "Bitget Wallet":
      return `${walletDeepLinks.bitKeep}${dappUrl}`;
    default:
      return "";
  }
};

export const switchDataset = (_value: filterType) => {
  switch (_value) {
    case "all":
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
    case "custom":
      return [
        "12 AM",
        "1 AM",
        "2 AM",
        "3 AM",
        "4 AM",
        "5 AM",
        "6 AM",
        "7 AM",
        "8 AM",
        "9 AM",
        "10 AM",
        "11 AM",
        "12 PM",
        "1 PM",
        "2 PM",
        "3 PM",
        "4 PM",
        "5 PM",
        "6 PM",
        "7 PM",
        "8 PM",
        "9 PM",
        "10 PM",
        "11 PM"
      ];
    case "1d":
      return [
        "12 AM",
        "1 AM",
        "2 AM",
        "3 AM",
        "4 AM",
        "5 AM",
        "6 AM",
        "7 AM",
        "8 AM",
        "9 AM",
        "10 AM",
        "11 AM",
        "12 PM",
        "1 PM",
        "2 PM",
        "3 PM",
        "4 PM",
        "5 PM",
        "6 PM",
        "7 PM",
        "8 PM",
        "9 PM",
        "10 PM",
        "11 PM"
      ];
    case "1w":
      return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    case "1mo":
      return Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    case "6mo":
      return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    default:
      return [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
  }
};

export const customLink = (_name: string) => {
  return `${process.env.NEXT_APP_HOMEPAGE}?r=${_name}`; // `PolPick.com/?r=${_name}`;
};

// export const countUp = (limit: number) => {
//   let count = 0;
//   const _int = setInterval(() => {
//     if (count < limit) {
//       count++;
//     } else {
//       clearInterval(_int);
//     }
//   }, 200);
//   return count;
// };

const getRandomNumberBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const convertYearlyAffiliateData = (
  inputData: AffliateYearlyData[]
): Record<
  string,
  {
    clicks: number;
    earnings: number;
    conn_wallet: number;
    bet_volume: number;
  }
> => {
  const outputData: Record<
    string,
    {
      // month: string;
      clicks: number;
      earnings: number;
      conn_wallet: number;
      bet_volume: number;
    }
  > = {};

  monthsLibrary.forEach((month, index) => {
    outputData[month] = {
      // month,
      clicks: 0,
      earnings: 0,
      conn_wallet: 0,
      bet_volume: 0
    };

    if (inputData[index]) {
      inputData[index]?.clicks
        ? inputData[index].clicks
        : //  + index * getRandomNumberBetween(10, 20) // + index part for checking
          0;

      outputData[month].conn_wallet = inputData[index]?.totalConnectedWallets
        ? inputData[index].totalConnectedWallets
        : //  +          index * getRandomNumberBetween(10, 20) // + index part for checking
          0;

      outputData[month].bet_volume = inputData[index]?.totalBetAmount
        ? inputData[index].totalBetAmount
        : //  +         index * getRandomNumberBetween(100, 250)
          0; // + index part for checking

      outputData[month].earnings = inputData[index]?.totalEarnings
        ? inputData[index].totalEarnings
        : // +          index * getRandomNumberBetween(250, 750) // + index part for checking
          0; // + index part for checking
    }
  });

  return outputData;
};

export const convertWeeklyAffiliateData = (
  inputData: AffliateWeeklyData[]
): Record<
  string,
  {
    clicks: number;
    earnings: number;
    conn_wallet: number;
    bet_volume: number;
  }
> => {
  const outputData: Record<
    string,
    {
      // month: string;
      clicks: number;
      earnings: number;
      conn_wallet: number;
      bet_volume: number;
    }
  > = {};

  weeksLibrary.forEach((day, index) => {
    outputData[day] = {
      // month,
      clicks: 0,
      earnings: 0,
      conn_wallet: 0,
      bet_volume: 0
    };

    if (inputData[index]) {
      inputData[index]?.clicks
        ? inputData[index].clicks
        : //  + index * getRandomNumberBetween(10, 20) // + index part for checking
          0;

      outputData[day].conn_wallet = inputData[index]?.totalConnectedWallets
        ? inputData[index].totalConnectedWallets
        : //  +          index * getRandomNumberBetween(10, 20) // + index part for checking
          0;

      outputData[day].bet_volume = inputData[index]?.totalBetAmount
        ? inputData[index].totalBetAmount
        : //  +         index * getRandomNumberBetween(100, 250)
          0; // + index part for checking

      outputData[day].earnings = inputData[index]?.totalEarnings
        ? inputData[index].totalEarnings
        : // +          index * getRandomNumberBetween(250, 750) // + index part for checking
          0; // + index part for checking
    }
  });

  return outputData;
};

export const convertMonthlyAffiliateData = (
  inputData: AffliateMonthlyData[],
  month: number,
  year: number
): Record<
  string,
  {
    clicks: number;
    earnings: number;
    conn_wallet: number;
    bet_volume: number;
  }
> => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const outputData: Record<
    string,
    {
      clicks: number;
      earnings: number;
      conn_wallet: number;
      bet_volume: number;
    }
  > = {};
  for (let day = 1; day <= daysInMonth; day++) {
    outputData[day] = {
      clicks: 0,
      earnings: 0,
      conn_wallet: 0,
      bet_volume: 0
    };

    const dailyData = inputData.find((data) => data.day === day);

    if (dailyData) {
      outputData[day].clicks = dailyData.clicks || 0;
      outputData[day].conn_wallet = dailyData.totalConnectedWallets || 0;
      outputData[day].bet_volume = dailyData.totalBetAmount || 0;
      outputData[day].earnings = dailyData.totalEarnings || 0;
    }
  }

  return outputData;
};

export const convertHourlyAffiliateData = (
  inputData: AffliateDailyData[]
): Record<
  string,
  {
    clicks: number;
    earnings: number;
    conn_wallet: number;
    bet_volume: number;
  }
> => {
  const hoursInDay = 24;
  const outputData: Record<
    string,
    {
      clicks: number;
      earnings: number;
      conn_wallet: number;
      bet_volume: number;
    }
  > = {};

  for (let hour = 0; hour < hoursInDay; hour++) {
    outputData[hour] = {
      clicks: 0,
      earnings: 0,
      conn_wallet: 0,
      bet_volume: 0
    };

    const hourlyData = inputData.find((data) => data.hour === hour);

    if (hourlyData) {
      outputData[hour].clicks = hourlyData.clicks || 0;
      outputData[hour].conn_wallet = hourlyData.totalConnectedWallets || 0;
      outputData[hour].bet_volume = hourlyData.totalBetAmount || 0;
      outputData[hour].earnings = hourlyData.totalEarnings || 0;
    }
  }

  return outputData;
};
