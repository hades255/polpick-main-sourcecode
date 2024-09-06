import assest from "@/json/assest";
import HeaderSmallIcon1 from "@/ui/Icons/HeaderSmallIcon1";
import HeaderSmallIcon2 from "@/ui/Icons/HeaderSmallIcon2";
import HeaderSmallIcon3 from "@/ui/Icons/HeaderSmallIcon3";

export const MAX_SIZE_FILE = 2000000;

export const walletDeepLinks = {
  metaMask: "https://metamask.app.link/dapp/",
  trustWallet: "https://link.trustwallet.com/open_url?coin_id=60&url=",
  coinBase: "https://go.cb-w.com/dapp?cb_url=",
  okxWallet: "okex://www.okex.com/dapp/",
  bitKeep: "bitkeep://dapp/"
};
export const urlRegex =
  /^(https?:\/\/|okex:\/\/|bitkeep:\/\/|www\.)?(metamask\.app\.link\/dapp\/|link\.trustwallet\.com\/open_url\?coin_id=60&url=|go\.cb-w\.com\/dapp\?cb_url=|www\.okex\.com\/dapp\/|okex\.com\/dapp\/|bitkeep:\/\/dapp\/)$/;

export const rankWiseWinnerFrames = [
  { rank: 1, frame: assest.weeklygold, crownIcon: assest.winner_one_crown },
  { rank: 2, frame: assest.weeklysilver, crownIcon: assest.winner_two_crown },
  { rank: 3, frame: assest.weeklybronze, crownIcon: assest.winner_three_crown }
];

// 'fiveBets': 0,
// 'fiveWins': 0,
// 'fiveWinsStreak': 0,
// 'tenWinsStreak': 0,
// 'twentyWinsStreak': 0,
// 'fortyWinsStreak': 0,
// 'firstTrade': 0,
// 'totalTicketsCount': 0
export interface TradeMock {
  name: string;
  description: string;
  stopColor1: string;
  stopColor2: string;
  knobColor: string;
  icon: React.ReactNode;
  completionRate: number;
  ticketCount: number;
}

export const userStreaks: TradeMock[] = [
  {
    name: "firstTrade",
    description: "First Trade",
    stopColor1: "#FFFB98",
    stopColor2: "#D1C90B",
    knobColor: "#D1C90B",
    icon: <HeaderSmallIcon2 />,
    completionRate: 0,
    ticketCount: 100
  },
  {
    name: "fiveWins",
    description: "5x wins",

    icon: <HeaderSmallIcon1 />,

    stopColor1: "#19C8AB",
    stopColor2: "#4EFADE",
    knobColor: "#19C8AB",
    completionRate: 0,
    ticketCount: 25
  },
  {
    name: "fiveBets",
    description: "Every 5 bets",
    icon: <HeaderSmallIcon1 />,
    stopColor1: "#326AFF",
    stopColor2: "#769BFF",
    knobColor: "#4F80FF",
    completionRate: 40,
    ticketCount: 5
  },
  {
    name: "fiveWinsStreak",
    icon: <HeaderSmallIcon3 />,
    stopColor1: "#AF3BB9",
    stopColor2: "#EC76FF",
    knobColor: "#AF3BB9",
    completionRate: 0,
    ticketCount: 50,
    description: "5x streak"
  },
  {
    name: "tenWinsStreak",
    icon: <HeaderSmallIcon3 />,
    stopColor1: "#5CED8D",
    stopColor2: "#129E41",
    knobColor: "#5CED8D",
    completionRate: 0,
    ticketCount: 500,
    description: "10x win streak"
  },
  {
    name: "twentyWinsStreak",
    icon: <HeaderSmallIcon3 />,
    stopColor1: "#FF7424",
    stopColor2: "#FF9736",
    knobColor: "#FF7424",
    completionRate: 0,
    ticketCount: 1000,
    description: "20x win streak"
  },
  {
    name: "fortyWinsStreak",
    icon: <HeaderSmallIcon3 />,
    stopColor1: "#FF97B0",
    stopColor2: "#FF3C6A",
    knobColor: "#FF4471",
    completionRate: 0,
    ticketCount: 5000,
    description: "40x win streak"
  }
];

export const countries2 = [
  {
    code: "US",
    label: "United States",
    suggested: true
  },
  { code: "AD", label: "Andorra" },
  {
    code: "AE",
    label: "United Arab Emirates"
  },
  { code: "AF", label: "Afghanistan" },
  {
    code: "AG",
    label: "Antigua and Barbuda"
  },
  { code: "AI", label: "Anguilla" },
  { code: "AL", label: "Albania" },
  { code: "AM", label: "Armenia" },
  { code: "AO", label: "Angola" },
  { code: "AQ", label: "Antarctica" },
  { code: "AR", label: "Argentina" },
  { code: "AS", label: "American Samoa" },
  { code: "AT", label: "Austria" },
  {
    code: "AU",
    label: "Australia",

    suggested: true
  },
  { code: "AW", label: "Aruba" },
  { code: "AX", label: "Alland Islands" },
  { code: "AZ", label: "Azerbaijan" },
  {
    code: "BA",
    label: "Bosnia and Herzegovina"
  },
  { code: "BB", label: "Barbados" },
  { code: "BD", label: "Bangladesh" },
  { code: "BE", label: "Belgium" },
  { code: "BF", label: "Burkina Faso" },
  { code: "BG", label: "Bulgaria" },
  { code: "BH", label: "Bahrain" },
  { code: "BI", label: "Burundi" },
  { code: "BJ", label: "Benin" },
  { code: "BL", label: "Saint Barthelemy" },
  { code: "BM", label: "Bermuda" },
  { code: "BN", label: "Brunei Darussalam" },
  { code: "BO", label: "Bolivia" },
  { code: "BR", label: "Brazil" },
  { code: "BS", label: "Bahamas" },
  { code: "BT", label: "Bhutan" },
  { code: "BV", label: "Bouvet Island" },
  { code: "BW", label: "Botswana" },
  { code: "BY", label: "Belarus" },
  { code: "BZ", label: "Belize" },
  {
    code: "CA",
    label: "Canada",
    suggested: true
  },
  {
    code: "CC",
    label: "Cocos (Keeling) Islands"
  },
  {
    code: "CD",
    label: "Congo, Democratic Republic of the"
  },
  {
    code: "CF",
    label: "Central African Republic"
  },
  {
    code: "CG",
    label: "Congo, Republic of the"
  },
  { code: "CH", label: "Switzerland" },
  { code: "CI", label: "Cote d'Ivoire" },
  { code: "CK", label: "Cook Islands" },
  { code: "CL", label: "Chile" },
  { code: "CM", label: "Cameroon" },
  { code: "CN", label: "China" },
  { code: "CO", label: "Colombia" },
  { code: "CR", label: "Costa Rica" },
  { code: "CU", label: "Cuba" },
  { code: "CV", label: "Cape Verde" },
  { code: "CW", label: "Curacao" },
  { code: "CX", label: "Christmas Island" },
  { code: "CY", label: "Cyprus" },
  { code: "CZ", label: "Czech Republic" },
  {
    code: "DE",
    label: "Germany",

    suggested: true
  },
  { code: "DJ", label: "Djibouti" },
  { code: "DK", label: "Denmark" },
  { code: "DM", label: "Dominica" },
  {
    code: "DO",
    label: "Dominican Republic"
  },
  { code: "DZ", label: "Algeria" },
  { code: "EC", label: "Ecuador" },
  { code: "EE", label: "Estonia" },
  { code: "EG", label: "Egypt" },
  { code: "EH", label: "Western Sahara" },
  { code: "ER", label: "Eritrea" },
  { code: "ES", label: "Spain" },
  { code: "ET", label: "Ethiopia" },
  { code: "FI", label: "Finland" },
  { code: "FJ", label: "Fiji" },
  {
    code: "FK",
    label: "Falkland Islands (Malvinas)"
  },
  {
    code: "FM",
    label: "Micronesia, Federated States of"
  },
  { code: "FO", label: "Faroe Islands" },
  {
    code: "FR",
    label: "France",

    suggested: true
  },
  { code: "GA", label: "Gabon" },
  { code: "GB", label: "United Kingdom" },
  { code: "GD", label: "Grenada" },
  { code: "GE", label: "Georgia" },
  { code: "GF", label: "French Guiana" },
  { code: "GG", label: "Guernsey" },
  { code: "GH", label: "Ghana" },
  { code: "GI", label: "Gibraltar" },
  { code: "GL", label: "Greenland" },
  { code: "GM", label: "Gambia" },
  { code: "GN", label: "Guinea" },
  { code: "GP", label: "Guadeloupe" },
  { code: "GQ", label: "Equatorial Guinea" },
  { code: "GR", label: "Greece" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands"
  },
  { code: "GT", label: "Guatemala" },
  { code: "GU", label: "Guam" },
  { code: "GW", label: "Guinea-Bissau" },
  { code: "GY", label: "Guyana" },
  { code: "HK", label: "Hong Kong" },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands"
  },
  { code: "HN", label: "Honduras" },
  { code: "HR", label: "Croatia" },
  { code: "HT", label: "Haiti" },
  { code: "HU", label: "Hungary" },
  { code: "ID", label: "Indonesia" },
  { code: "IE", label: "Ireland" },
  { code: "IL", label: "Israel" },
  { code: "IM", label: "Isle of Man" },
  { code: "IN", label: "India" },
  {
    code: "IO",
    label: "British Indian Ocean Territory"
  },
  { code: "IQ", label: "Iraq" },
  {
    code: "IR",
    label: "Iran, Islamic Republic of"
  },
  { code: "IS", label: "Iceland" },
  { code: "IT", label: "Italy" },
  { code: "JE", label: "Jersey" },
  { code: "JM", label: "Jamaica" },
  { code: "JO", label: "Jordan" },
  {
    code: "JP",
    label: "Japan",

    suggested: true
  },
  { code: "KE", label: "Kenya" },
  { code: "KG", label: "Kyrgyzstan" },
  { code: "KH", label: "Cambodia" },
  { code: "KI", label: "Kiribati" },
  { code: "KM", label: "Comoros" },
  {
    code: "KN",
    label: "Saint Kitts and Nevis"
  },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of"
  },
  { code: "KR", label: "Korea, Republic of" },
  { code: "KW", label: "Kuwait" },
  { code: "KY", label: "Cayman Islands" },
  { code: "KZ", label: "Kazakhstan" },
  {
    code: "LA",
    label: "Lao People's Democratic Republic"
  },
  { code: "LB", label: "Lebanon" },
  { code: "LC", label: "Saint Lucia" },
  { code: "LI", label: "Liechtenstein" },
  { code: "LK", label: "Sri Lanka" },
  { code: "LR", label: "Liberia" },
  { code: "LS", label: "Lesotho" },
  { code: "LT", label: "Lithuania" },
  { code: "LU", label: "Luxembourg" },
  { code: "LV", label: "Latvia" },
  { code: "LY", label: "Libya" },
  { code: "MA", label: "Morocco" },
  { code: "MC", label: "Monaco" },
  {
    code: "MD",
    label: "Moldova, Republic of"
  },
  { code: "ME", label: "Montenegro" },
  {
    code: "MF",
    label: "Saint Martin (French part)"
  },
  { code: "MG", label: "Madagascar" },
  { code: "MH", label: "Marshall Islands" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of"
  },
  { code: "ML", label: "Mali" },
  { code: "MM", label: "Myanmar" },
  { code: "MN", label: "Mongolia" },
  { code: "MO", label: "Macao" },
  {
    code: "MP",
    label: "Northern Mariana Islands"
  },
  { code: "MQ", label: "Martinique" },
  { code: "MR", label: "Mauritania" },
  { code: "MS", label: "Montserrat" },
  { code: "MT", label: "Malta" },
  { code: "MU", label: "Mauritius" },
  { code: "MV", label: "Maldives" },
  { code: "MW", label: "Malawi" },
  { code: "MX", label: "Mexico" },
  { code: "MY", label: "Malaysia" },
  { code: "MZ", label: "Mozambique" },
  { code: "NA", label: "Namibia" },
  { code: "NC", label: "New Caledonia" },
  { code: "NE", label: "Niger" },
  { code: "NF", label: "Norfolk Island" },
  { code: "NG", label: "Nigeria" },
  { code: "NI", label: "Nicaragua" },
  { code: "NL", label: "Netherlands" },
  { code: "NO", label: "Norway" },
  { code: "NP", label: "Nepal" },
  { code: "NR", label: "Nauru" },
  { code: "NU", label: "Niue" },
  { code: "NZ", label: "New Zealand" },
  { code: "OM", label: "Oman" },
  { code: "PA", label: "Panama" },
  { code: "PE", label: "Peru" },
  { code: "PF", label: "French Polynesia" },
  { code: "PG", label: "Papua New Guinea" },
  { code: "PH", label: "Philippines" },
  { code: "PK", label: "Pakistan" },
  { code: "PL", label: "Poland" },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon"
  },
  { code: "PN", label: "Pitcairn" },
  { code: "PR", label: "Puerto Rico" },
  {
    code: "PS",
    label: "Palestine, State of"
  },
  { code: "PT", label: "Portugal" },
  { code: "PW", label: "Palau" },
  { code: "PY", label: "Paraguay" },
  { code: "QA", label: "Qatar" },
  { code: "RE", label: "Reunion" },
  { code: "RO", label: "Romania" },
  { code: "RS", label: "Serbia" },
  { code: "RU", label: "Russian Federation" },
  { code: "RW", label: "Rwanda" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "SB", label: "Solomon Islands" },
  { code: "SC", label: "Seychelles" },
  { code: "SD", label: "Sudan" },
  { code: "SE", label: "Sweden" },
  { code: "SG", label: "Singapore" },
  { code: "SH", label: "Saint Helena" },
  { code: "SI", label: "Slovenia" },
  {
    code: "SJ",
    label: "Svalbard and Jan Mayen"
  },
  { code: "SK", label: "Slovakia" },
  { code: "SL", label: "Sierra Leone" },
  { code: "SM", label: "San Marino" },
  { code: "SN", label: "Senegal" },
  { code: "SO", label: "Somalia" },
  { code: "SR", label: "Suriname" },
  { code: "SS", label: "South Sudan" },
  {
    code: "ST",
    label: "Sao Tome and Principe"
  },
  { code: "SV", label: "El Salvador" },
  {
    code: "SX",
    label: "Sint Maarten (Dutch part)"
  },
  {
    code: "SY",
    label: "Syrian Arab Republic"
  },
  { code: "SZ", label: "Swaziland" },
  {
    code: "TC",
    label: "Turks and Caicos Islands"
  },
  { code: "TD", label: "Chad" },
  {
    code: "TF",
    label: "French Southern Territories"
  },
  { code: "TG", label: "Togo" },
  { code: "TH", label: "Thailand" },
  { code: "TJ", label: "Tajikistan" },
  { code: "TK", label: "Tokelau" },
  { code: "TL", label: "Timor-Leste" },
  { code: "TM", label: "Turkmenistan" },
  { code: "TN", label: "Tunisia" },
  { code: "TO", label: "Tonga" },
  { code: "TR", label: "Turkey" },
  {
    code: "TT",
    label: "Trinidad and Tobago"
  },
  { code: "TV", label: "Tuvalu" },
  {
    code: "TW",
    label: "Taiwan, Republic of China"
  },
  {
    code: "TZ",
    label: "United Republic of Tanzania"
  },
  { code: "UA", label: "Ukraine" },
  { code: "UG", label: "Uganda" },

  { code: "UY", label: "Uruguay" },
  { code: "UZ", label: "Uzbekistan" },
  {
    code: "VA",
    label: "Holy See (Vatican City State)"
  },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines"
  },
  { code: "VE", label: "Venezuela" },
  {
    code: "VG",
    label: "British Virgin Islands"
  },
  {
    code: "VI",
    label: "US Virgin Islands"
  },
  { code: "VN", label: "Vietnam" },
  { code: "VU", label: "Vanuatu" },
  { code: "WF", label: "Wallis and Futuna" },
  { code: "WS", label: "Samoa" },
  { code: "XK", label: "Kosovo" },
  { code: "YE", label: "Yemen" },
  { code: "YT", label: "Mayotte" },
  { code: "ZA", label: "South Africa" },
  { code: "ZM", label: "Zambia" },
  { code: "ZW", label: "Zimbabwe" }
];

export const _coinList = [
  "btc",
  "sol",
  "usdt",
  "eth",
  "trx",
  "bnb",
  "usdcbsc",
  "ada",
  "shib",
  "doge",
  "ltc",
  "arb",
  "xrp",
  "avax",
  "usdtrx",
  "usdt20",
  "bnb"
];

export const monthsLibrary = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const weeksLibrary = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedenesday",
  "Thrusday",
  "Friday",
  "Saturday"
];
