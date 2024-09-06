/* eslint-disable import/no-cycle */
import { ITradeData } from "@/components/VisxChart/VisxChart";
import { AffiliateGraphData } from "@/reduxtoolkit/interfaces/interfaces";
import assest from "../assest";

export const demo = [
  {
    name: "asdfasdf"
  }
];

export const singleCardData = [
  {
    id: "1",
    flagimage: `${assest.flagImage1}`,
    userImage: `${assest.userImage1}`,
    price: "1500.50",
    name: "0x157...8c",
    up: true
  },
  {
    id: "2",
    flagimage: `${assest.flagImage2}`,
    userImage: `${assest.userImage2}`,
    price: "1400",
    name: "0x157...8c",
    up: true
  },
  {
    id: "3",
    flagimage: `${assest.flagImage3}`,
    userImage: `${assest.userImage3}`,
    price: "750",
    name: "0x157...8c",
    up: false
  },
  {
    id: "4",
    flagimage: `${assest.flagImage4}`,
    userImage: `${assest.userImage4}`,
    price: "600",
    name: "0x157...8c",
    up: true
  },
  {
    id: "5",
    flagimage: `${assest.flagImage1}`,
    userImage: `${assest.userImage5}`,
    price: "1500.50",
    name: "0x157...8c",
    up: true
  },
  {
    id: "6",
    flagimage: `${assest.flagImage3}`,
    userImage: `${assest.userImage3}`,
    price: "750",
    name: "0x157...8c",
    up: false
  }
];

export const poolDataItem = [
  {
    flagImage: `${assest.flagImage1}`,
    userImage: `${assest.user01}`,
    tradeName: "0x123A04d2257...8a23",
    countMatic: "10"
  },
  {
    flagImage: `${assest.flagImage1}`,
    userImage: `${assest.user02}`,
    tradeName: "0x123A04d2257...8a23",
    countMatic: "10"
  },
  {
    flagImage: `${assest.flagImage1}`,
    userImage: `${assest.user03}`,
    tradeName: "0x123A04d2257...8a23",
    countMatic: "10"
  },
  {
    flagImage: `${assest.flagImage1}`,
    userImage: `${assest.user04}`,
    tradeName: "0x123A04d2257...8a23",
    countMatic: "10"
  },
  {
    flagImage: `${assest.flagImage1}`,
    userImage: `${assest.user04}`,
    tradeName: "0x123A04d2257...8a23",
    countMatic: "10"
  },
  {
    flagImage: `${assest.flagImage1}`,
    userImage: `${assest.user02}`,
    tradeName: "0x123A04d2257...8a23",
    countMatic: "10"
  },
  {
    flagImage: `${assest.flagImage1}`,
    userImage: `${assest.user04}`,
    tradeName: "0x123A04d2257...8a23",
    countMatic: "10"
  },
  {
    flagImage: `${assest.flagImage1}`,
    userImage: `${assest.user02}`,
    tradeName: "0x123A04d2257...8a23",
    countMatic: "10"
  },
  {
    flagImage: `${assest.flagImage1}`,
    userImage: `${assest.user04}`,
    tradeName: "0x123A04d2257...8a23",
    countMatic: "10"
  },
  {
    flagImage: `${assest.flagImage1}`,
    userImage: `${assest.user02}`,
    tradeName: "0x123A04d2257...8a23",
    countMatic: "10"
  }
];

export const historytbaleData = [
  {
    number: `${assest.tableImage1}`,
    user: `${assest.tableUserImage1}`,
    wallet: "0x157435436456d3f...8e",
    tickets: 998,
    prize: "500"
  },
  {
    number: `${assest.tableImage2}`,
    user: `${assest.tableUserImage2}`,
    wallet: "0x157435436456d3f...8e",
    tickets: 1400,
    prize: "450"
  },
  {
    number: `${assest.tableImage3}`,
    user: `${assest.tableUserImage3}`,
    wallet: "0x157435436456d3f...8e",
    tickets: 750,
    prize: "400"
  },
  {
    number: `${assest.tableImage4}`,
    user: `${assest.tableUserImage4}`,
    wallet: "0x157435436456d3f...8e",
    tickets: 600,
    prize: "0"
  },
  {
    number: `${assest.tableImage5}`,
    user: `${assest.tableUserImage5}`,
    wallet: "0x157435436456d3f...8e",
    tickets: 998,
    prize: "0"
  },
  {
    number: `${assest.tableImage6}`,
    user: `${assest.tableUserImage6}`,
    wallet: "0x157435436456d3f...8e",
    tickets: 934,
    prize: "0"
  },
  {
    number: `${assest.tableImage7}`,
    user: `${assest.tableUserImage7}`,
    wallet: "0x157435436456d3f...8e",
    tickets: 550,
    prize: "0"
  },
  {
    number: `${assest.tableImage8}`,
    user: `${assest.tableUserImage5}`,
    wallet: "0x157435436456d3f...8e",
    tickets: 550,
    prize: "0"
  },
  {
    number: `${assest.tableImage9}`,
    user: `${assest.tableUserImage2}`,
    wallet: "0x157435436456d3f...8e",
    tickets: 550,
    prize: "0"
  }
];
export const playerData = [
  {
    rank: 1,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1600",
    turnover: "1998",
    prize: "450"
  },
  {
    rank: 2,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag2}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1500",
    turnover: "1780",
    prize: "450"
  },
  {
    rank: 3,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag3}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1580",
    prize: "450"
  },
  {
    rank: 4,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1200",
    prize: "450"
  },
  {
    rank: 5,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1200",
    prize: "450"
  },
  {
    rank: 6,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1200",
    prize: "450"
  },
  {
    rank: 7,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1200",
    prize: "450"
  },
  {
    rank: 8,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1200",
    prize: "450"
  },

  {
    rank: 9,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1200",
    prize: "450"
  },
  {
    rank: 10,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag2}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1200",
    prize: "450"
  },
  {
    rank: 11,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag3}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1200",
    prize: "450"
  },
  {
    rank: 12,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1200",
    prize: "450"
  },
  {
    rank: 13,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1200",
    prize: "450"
  },
  {
    rank: 14,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1200",
    prize: "450"
  },
  {
    rank: 15,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1200",
    prize: "450"
  },
  {
    rank: 16,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: "1400",
    turnover: "1200",
    prize: "450"
  }
];

export const windata = [
  {
    rank: 1,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 998,
    wins: 49,
    winratio: "77.12%",
    prize: 500
  },
  {
    rank: 2,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag2}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 1400,
    wins: 80,
    winratio: "68.15%",
    prize: 450
  },
  {
    rank: 3,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag3}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 750,
    wins: 105,
    winratio: "64.14%",
    prize: 400
  },
  {
    rank: 4,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 600,
    wins: 55,
    winratio: "60.8%",
    prize: 350
  },
  {
    rank: 5,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag2}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 550,
    wins: 42,
    winratio: "54.66%",
    prize: 300
  },
  {
    rank: 6,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag3}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 400,
    wins: 30,
    winratio: "62.5%",
    prize: 275
  },
  {
    rank: 7,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 850,
    wins: 65,
    winratio: "54.66%",
    prize: 250
  },
  {
    rank: 8,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag3}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 430,
    wins: 32,
    winratio: "63.49%",
    prize: 225
  },
  {
    rank: 9,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 550,
    wins: 35,
    winratio: "54.66%",
    prize: 200
  },
  {
    rank: 10,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag2}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 1050,
    wins: 75,
    winratio: "54.66%",
    prize: 175
  },
  {
    rank: 11,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag3}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 480,
    wins: 28,
    winratio: "58.33%",
    prize: 150
  },
  {
    rank: 12,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag3}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 320,
    wins: 20,
    winratio: "62.5%",
    prize: 125
  },
  {
    rank: 13,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 500,
    wins: 30,
    winratio: "60%",
    prize: 100
  },
  {
    rank: 14,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag2}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 900,
    wins: 60,
    winratio: "54.66%",
    prize: 75
  },
  {
    rank: 15,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 420,
    wins: 25,
    winratio: "59.52%",
    prize: 50
  },
  {
    rank: 16,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag2}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 260,
    wins: 15,
    winratio: "57.69%",
    prize: 25
  },
  {
    rank: 17,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag1}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 380,
    wins: 20,
    winratio: "52.63%",
    prize: 20
  },
  {
    rank: 18,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag2}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 700,
    wins: 40,
    winratio: "57.14%",
    prize: 15
  },
  {
    rank: 19,
    player: `${assest.user1}`,
    graphdirection: `${assest.graphuparrow}`,
    flagimg: `${assest.flag3}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 310,
    wins: 15,
    winratio: "48.39%",
    prize: 10
  },
  {
    rank: 20,
    player: `${assest.user2}`,
    graphdirection: `${assest.graphdownarrow}`,
    flagimg: `${assest.flag3}`,
    wallet: "0x5435436456d3f7...8c",
    trades: 150,
    wins: 10,
    winratio: "40%",
    prize: 5
  }
];

export const managerData = [
  {
    date: "11.11.2023",
    name: "Link Name",
    link: "0x157435436456d3f...8e",
    friends: 34,
    earnToday: 33.45,
    earningTotal: 500
  },
  {
    date: "11.11.2023",
    name: "Link Name",
    link: "0x157435436456d3f...8e",
    friends: 354,
    earnToday: 618.15,
    earningTotal: 450
  },
  {
    date: "11.11.2023",
    name: "Link Name",
    link: "0x157435436456d3f...8e",
    friends: 750,
    earnToday: 614.14,
    earningTotal: 400
  },
  {
    date: "11.11.2023",
    name: "Link Name",
    link: "0x157435436456d3f...8e",
    friends: 5,
    earnToday: 760.8,
    earningTotal: 350
  },
  {
    date: "11.11.2023",
    name: "Link Name",
    link: "0x157435436456d3f...8e",
    friends: 398,
    earnToday: 57.2,
    earningTotal: 320
  },
  {
    date: "11.11.2023",
    name: "Link Name",
    link: "0x157435436456d3f...8e",
    friends: 12,
    earnToday: 54.66,
    earningTotal: 300
  },
  {
    date: "11.11.2023",
    name: "Link Name",
    link: "0x157435436456d3f...8e",
    friends: 167,
    earnToday: 50.13,
    earningTotal: 270
  },
  {
    date: "11.11.2023",
    name: "Link Name",
    link: "0x157435436456d3f...8e",
    friends: 167,
    earnToday: 50.13,
    earningTotal: 270
  },
  {
    date: "11.11.2023",
    name: "Link Name",
    link: "0x157435436456d3f...8e",
    friends: 167,
    earnToday: 50.13,
    earningTotal: 270
  },
  {
    date: "11.11.2023",
    name: "Link Name",
    link: "0x157435436456d3f...8e",
    friends: 167,
    earnToday: 50.13,
    earningTotal: 270
  },
  {
    date: "11.11.2023",
    name: "Link Name",
    link: "0x157435436456d3f...8e",
    friends: 167,
    earnToday: 50.13,
    earningTotal: 270
  },
  {
    date: "11.11.2023",
    name: "Link Name",
    link: "0x157435436456d3f...8e",
    friends: 167,
    earnToday: 50.13,
    earningTotal: 270
  },
  {
    date: "11.11.2023",
    name: "Link Name",
    link: "0x157435436456d3f...8e",
    friends: 167,
    earnToday: 50.13,
    earningTotal: 270
  }
];

// export const profileData: ProfileTableData[] = [
//   {
//     date: "11.11.2023",
//     wager: 50,
//     payout: "$998",
//     profit: 1998,
//     sharebet: "#url"
//   },
//   {
//     date: "07.11.2023",
//     wager: 20,
//     payout: "$1400",
//     profit: 1200,
//     sharebet: "#url"
//   },
//   {
//     date: "11.11.2023",
//     wager: 100,
//     payout: "$750",
//     profit: 750,
//     sharebet: "#url"
//   },
//   {
//     date: "11.11.2023",
//     wager: 200,
//     payout: "$600",
//     profit: 600,
//     sharebet: "#url"
//   },
//   {
//     date: "11.11.2023",
//     wager: 50,
//     payout: "$998",
//     profit: 450,
//     sharebet: "#url"
//   },
//   {
//     date: "11.11.2023",
//     wager: 50,
//     payout: "$998",
//     profit: 450,
//     sharebet: "#url"
//   },
//   {
//     date: "11.11.2023",
//     wager: 50,
//     payout: "$998",
//     profit: 450,
//     sharebet: "#url"
//   },
//   {
//     date: "11.11.2023",
//     wager: 50,
//     payout: "$998",
//     profit: 450,
//     sharebet: "#url"
//   },
//   {
//     date: "11.11.2023",
//     wager: 50,
//     payout: "$998",
//     profit: 450,
//     sharebet: "#url"
//   },

//   {
//     date: "11.11.2023",
//     wager: 50,
//     payout: "$998",
//     profit: 450,
//     sharebet: "#url"
//   },
//   {
//     date: "11.11.2023",
//     wager: 50,
//     payout: "$998",
//     profit: 450,
//     sharebet: "#url"
//   },

//   {
//     date: "11.11.2023",
//     wager: 50,
//     payout: "$998",
//     profit: 450,
//     sharebet: "#url"
//   },
//   {
//     date: "11.11.2023",
//     wager: 50,
//     payout: "$998",
//     profit: 450,
//     sharebet: "#url"
//   },

//   {
//     date: "11.11.2023",
//     wager: 50,
//     payout: "$998",
//     profit: 450,
//     sharebet: "#url"
//   },
//   {
//     date: "11.11.2023",
//     wager: 50,
//     payout: "$998",
//     profit: 450,
//     sharebet: "#url"
//   },
//   {
//     date: "11.11.2023",
//     wager: 50,
//     payout: "$998",
//     profit: 450,
//     sharebet: "#url"
//   }
// ];

export const dataSeries = [
  [
    {
      date: "2014-04-29",
      value: 79470783
    },
    {
      date: "2014-04-30",
      value: 80170783
    }
  ],
  [
    {
      date: "2014-01-01",
      value: 150000000
    },
    {
      date: "2014-01-02",
      value: 160379978
    },
    {
      date: "2014-01-03",
      value: 170493749
    },
    {
      date: "2014-01-04",
      value: 160785250
    },
    {
      date: "2014-01-05",
      value: 167391904
    },
    {
      date: "2014-01-06",
      value: 161576838
    },
    {
      date: "2014-01-07",
      value: 161413854
    },
    {
      date: "2014-01-08",
      value: 152177211
    },
    {
      date: "2014-01-09",
      value: 140762210
    },
    {
      date: "2014-01-10",
      value: 144381072
    },
    {
      date: "2014-01-11",
      value: 154352310
    },
    {
      date: "2014-01-12",
      value: 165531790
    },
    {
      date: "2014-01-13",
      value: 175748881
    },
    {
      date: "2014-01-14",
      value: 187064037
    },
    {
      date: "2014-01-15",
      value: 197520685
    },
    {
      date: "2014-01-16",
      value: 210176418
    },
    {
      date: "2014-01-17",
      value: 196122924
    },
    {
      date: "2014-01-18",
      value: 207337480
    },
    {
      date: "2014-01-19",
      value: 200258882
    },
    {
      date: "2014-01-20",
      value: 186829538
    },
    {
      date: "2014-01-21",
      value: 192456897
    },
    {
      date: "2014-01-22",
      value: 204299711
    },
    {
      date: "2014-01-23",
      value: 192759017
    },
    {
      date: "2014-01-24",
      value: 203596183
    },
    {
      date: "2014-01-25",
      value: 208107346
    },
    {
      date: "2014-01-26",
      value: 196359852
    },
    {
      date: "2014-01-27",
      value: 192570783
    },
    {
      date: "2014-01-28",
      value: 177967768
    },
    {
      date: "2014-01-29",
      value: 190632803
    },
    {
      date: "2014-01-30",
      value: 203725316
    },
    {
      date: "2014-01-31",
      value: 218226177
    },
    {
      date: "2014-02-01",
      value: 210698669
    },
    {
      date: "2014-02-02",
      value: 217640656
    },
    {
      date: "2014-02-03",
      value: 216142362
    },
    {
      date: "2014-02-04",
      value: 201410971
    },
    {
      date: "2014-02-05",
      value: 196704289
    },
    {
      date: "2014-02-06",
      value: 190436945
    },
    {
      date: "2014-02-07",
      value: 178891686
    },
    {
      date: "2014-02-08",
      value: 171613962
    },
    {
      date: "2014-02-09",
      value: 157579773
    },
    {
      date: "2014-02-10",
      value: 158677098
    },
    {
      date: "2014-02-11",
      value: 147129977
    },
    {
      date: "2014-02-12",
      value: 151561876
    },
    {
      date: "2014-02-13",
      value: 151627421
    },
    {
      date: "2014-02-14",
      value: 143543872
    },
    {
      date: "2014-02-15",
      value: 136581057
    },
    {
      date: "2014-02-16",
      value: 135560715
    },
    {
      date: "2014-02-17",
      value: 122625263
    },
    {
      date: "2014-02-18",
      value: 112091484
    },
    {
      date: "2014-02-19",
      value: 98810329
    },
    {
      date: "2014-02-20",
      value: 99882912
    },
    {
      date: "2014-02-21",
      value: 94943095
    },
    {
      date: "2014-02-22",
      value: 104875743
    },
    {
      date: "2014-02-23",
      value: 116383678
    },
    {
      date: "2014-02-24",
      value: 125028841
    },
    {
      date: "2014-02-25",
      value: 123967310
    },
    {
      date: "2014-02-26",
      value: 133167029
    },
    {
      date: "2014-02-27",
      value: 128577263
    },
    {
      date: "2014-02-28",
      value: 115836969
    },
    {
      date: "2014-03-01",
      value: 119264529
    },
    {
      date: "2014-03-02",
      value: 109363374
    },
    {
      date: "2014-03-03",
      value: 113985628
    },
    {
      date: "2014-03-04",
      value: 114650999
    },
    {
      date: "2014-03-05",
      value: 110866108
    },
    {
      date: "2014-03-06",
      value: 96473454
    },
    {
      date: "2014-03-07",
      value: 104075886
    },
    {
      date: "2014-03-08",
      value: 103568384
    },
    {
      date: "2014-03-09",
      value: 101534883
    },
    {
      date: "2014-03-10",
      value: 115825447
    },
    {
      date: "2014-03-11",
      value: 126133916
    },
    {
      date: "2014-03-12",
      value: 116502109
    },
    {
      date: "2014-03-13",
      value: 130169411
    },
    {
      date: "2014-03-14",
      value: 124296886
    },
    {
      date: "2014-03-15",
      value: 126347399
    },
    {
      date: "2014-03-16",
      value: 131483669
    },
    {
      date: "2014-03-17",
      value: 142811333
    },
    {
      date: "2014-03-18",
      value: 129675396
    },
    {
      date: "2014-03-19",
      value: 115514483
    },
    {
      date: "2014-03-20",
      value: 117630630
    },
    {
      date: "2014-03-21",
      value: 122340239
    },
    {
      date: "2014-03-22",
      value: 132349091
    },
    {
      date: "2014-03-23",
      value: 125613305
    },
    {
      date: "2014-03-24",
      value: 135592466
    },
    {
      date: "2014-03-25",
      value: 123408762
    },
    {
      date: "2014-03-26",
      value: 111991454
    },
    {
      date: "2014-03-27",
      value: 116123955
    },
    {
      date: "2014-03-28",
      value: 112817214
    },
    {
      date: "2014-03-29",
      value: 113029590
    },
    {
      date: "2014-03-30",
      value: 108753398
    },
    {
      date: "2014-03-31",
      value: 99383763
    },
    {
      date: "2014-04-01",
      value: 100151737
    },
    {
      date: "2014-04-02",
      value: 94985209
    },
    {
      date: "2014-04-03",
      value: 82913669
    },
    {
      date: "2014-04-04",
      value: 78748268
    },
    {
      date: "2014-04-05",
      value: 63829135
    },
    {
      date: "2014-04-06",
      value: 78694727
    },
    {
      date: "2014-04-07",
      value: 80868994
    },
    {
      date: "2014-04-08",
      value: 93799013
    },
    {
      date: "2014-04-09",
      value: 99042416
    },
    {
      date: "2014-04-10",
      value: 97298692
    },
    {
      date: "2014-04-11",
      value: 83353499
    },
    {
      date: "2014-04-12",
      value: 71248129
    },
    {
      date: "2014-04-13",
      value: 75253744
    },
    {
      date: "2014-04-14",
      value: 68976648
    },
    {
      date: "2014-04-15",
      value: 71002284
    },
    {
      date: "2014-04-16",
      value: 75052401
    },
    {
      date: "2014-04-17",
      value: 83894030
    },
    {
      date: "2014-04-18",
      value: 90236528
    },
    {
      date: "2014-04-19",
      value: 99739114
    },
    {
      date: "2014-04-20",
      value: 96407136
    },
    {
      date: "2014-04-21",
      value: 108323177
    },
    {
      date: "2014-04-22",
      value: 101578914
    },
    {
      date: "2014-04-23",
      value: 115877608
    },
    {
      date: "2014-04-24",
      value: 112088857
    },
    {
      date: "2014-04-25",
      value: 112071353
    },
    {
      date: "2014-04-26",
      value: 101790062
    },
    {
      date: "2014-04-27",
      value: 115003761
    },
    {
      date: "2014-04-28",
      value: 120457727
    },
    {
      date: "2014-04-29",
      value: 118253926
    },
    {
      date: "2014-04-30",
      value: 117956992
    }
  ]
];

export const tradeData: ITradeData[] = [
  {
    E: 1718711391444,
    M: true,
    T: 1718711391443,
    e: "trade",
    m: false,
    p: "65400.7848",
    q: "0.10000000",
    s: "BTCUSDT",
    t: 3641368259
  },
  {
    E: 1718711402555,
    M: false,
    T: 1718711402554,
    e: "trade",
    m: true,
    p: "75000.1234",
    q: "0.20000000",
    s: "BTCUSDT",
    t: 3641368260
  },
  {
    E: 1718711413666,
    M: true,
    T: 1718711413665,
    e: "trade",
    m: false,
    p: "50000.5678",
    q: "0.15000000",
    s: "BTCUSDT",
    t: 3641368261
  },
  {
    E: 1718711424777,
    M: false,
    T: 1718711424776,
    e: "trade",
    m: true,
    p: "85000.6789",
    q: "0.30000000",
    s: "BTCUSDT",
    t: 3641368262
  },
  {
    E: 1718711435888,
    M: true,
    T: 1718711435887,
    e: "trade",
    m: false,
    p: "30000.2345",
    q: "0.25000000",
    s: "BTCUSDT",
    t: 3641368263
  }
];
// export const dummyAffiliateGraphDataAll: AffiliateGraphData = {
//   January: {
//     clicks: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     earnings: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     conn_wallet: Array.from({ length: 31 }, () =>
//       Math.floor(Math.random() * 10)
//     ),
//     bet_volume: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10))
//   },
//   February: {
//     clicks: Array.from({ length: 28 }, () => Math.floor(Math.random() * 10)),
//     earnings: Array.from({ length: 28 }, () => Math.floor(Math.random() * 10)),
//     conn_wallet: Array.from({ length: 28 }, () =>
//       Math.floor(Math.random() * 10)
//     ),
//     bet_volume: Array.from({ length: 28 }, () => Math.floor(Math.random() * 10))
//   },
//   March: {
//     clicks: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     earnings: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     conn_wallet: Array.from({ length: 31 }, () =>
//       Math.floor(Math.random() * 10)
//     ),
//     bet_volume: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10))
//   },
//   April: {
//     clicks: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)),
//     earnings: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)),
//     conn_wallet: Array.from({ length: 30 }, () =>
//       Math.floor(Math.random() * 10)
//     ),
//     bet_volume: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10))
//   },
//   May: {
//     clicks: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     earnings: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     conn_wallet: Array.from({ length: 31 }, () =>
//       Math.floor(Math.random() * 10)
//     ),
//     bet_volume: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10))
//   },
//   June: {
//     clicks: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)),
//     earnings: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)),
//     conn_wallet: Array.from({ length: 30 }, () =>
//       Math.floor(Math.random() * 10)
//     ),
//     bet_volume: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10))
//   },
//   July: {
//     clicks: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     earnings: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     conn_wallet: Array.from({ length: 31 }, () =>
//       Math.floor(Math.random() * 10)
//     ),
//     bet_volume: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10))
//   },
//   August: {
//     clicks: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     earnings: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     conn_wallet: Array.from({ length: 31 }, () =>
//       Math.floor(Math.random() * 10)
//     ),
//     bet_volume: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10))
//   },
//   September: {
//     clicks: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)),
//     earnings: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)),
//     conn_wallet: Array.from({ length: 30 }, () =>
//       Math.floor(Math.random() * 10)
//     ),
//     bet_volume: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10))
//   },
//   October: {
//     clicks: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     earnings: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     conn_wallet: Array.from({ length: 31 }, () =>
//       Math.floor(Math.random() * 10)
//     ),
//     bet_volume: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10))
//   },
//   November: {
//     clicks: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)),
//     earnings: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10)),
//     conn_wallet: Array.from({ length: 30 }, () =>
//       Math.floor(Math.random() * 10)
//     ),
//     bet_volume: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10))
//   },
//   December: {
//     clicks: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     earnings: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10)),
//     conn_wallet: Array.from({ length: 31 }, () =>
//       Math.floor(Math.random() * 10)
//     ),
//     bet_volume: Array.from({ length: 31 }, () => Math.floor(Math.random() * 10))
//   }
// };

export const dummyAffilateGraphDataAll: AffiliateGraphData = {
  January: {
    clicks: 123,
    earnings: 123,
    conn_wallet: 233,
    bet_volume: 444
  },
  February: {
    clicks: 145,
    earnings: 134,
    conn_wallet: 211,
    bet_volume: 412
  },
  March: {
    clicks: 167,
    earnings: 145,
    conn_wallet: 189,
    bet_volume: 390
  },
  April: {
    clicks: 189,
    earnings: 156,
    conn_wallet: 167,
    bet_volume: 368
  },
  May: {
    clicks: 201,
    earnings: 167,
    conn_wallet: 145,
    bet_volume: 346
  },
  June: {
    clicks: 223,
    earnings: 178,
    conn_wallet: 123,
    bet_volume: 324
  },
  July: {
    clicks: 234,
    earnings: 189,
    conn_wallet: 112,
    bet_volume: 302
  },
  August: {
    clicks: 256,
    earnings: 200,
    conn_wallet: 90,
    bet_volume: 280
  },
  September: {
    clicks: 278,
    earnings: 211,
    conn_wallet: 78,
    bet_volume: 258
  },
  October: {
    clicks: 300,
    earnings: 223,
    conn_wallet: 56,
    bet_volume: 236
  },
  November: {
    clicks: 322,
    earnings: 234,
    conn_wallet: 34,
    bet_volume: 214
  },
  December: {
    clicks: 344,
    earnings: 245,
    conn_wallet: 12,
    bet_volume: 192
  }
};
