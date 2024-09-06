export type CommonButtonType = {
  children: JSX.Element;
  variant?: "text" | "outlined" | "contained";
  disabled: boolean;
  onClick?: () => {};
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  endIcon?: JSX.Element;
  startIcon?: JSX.Element;
  loading?: boolean;
};

export interface userRole {
  _id: string;
  role: "user" | "bot";
  roleDisplayName: "User" | "Bot";
}
export type userData = {
  _id: string;
  username: string;
  full_name: string;
  walletId: string;
  country: string;
  role: userRole;
  email: string;
  phone: string;
  countryCode: string;
  profile_image: string;
  social_link: string;
  whiteLabelId: string;
  highest_win: number;
  high_roller_rank: number;
  win_amount_daily: number;
  total_win: string;
  highest_win_amount: number;
  isAffiliateManager: boolean;
  isAffiliateUser: boolean;
  referral_link: string;
  telegramId: string;
  win_streak: number;
  total_game: number;
  total_wins: number;
  status: string;
  createdAt: string;
  pnlPercentage: number;
};

export {};
