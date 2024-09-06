/* eslint-disable @next/next/no-img-element */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-unused-vars */
import assest from "@/json/assest";

import { Avatar, Badge, Box, styled } from "@mui/material";

const SingleBadgeWrapper = styled(Box)`
  display: inline-flex;
  position: relative;
  align-items: flex-end;
  .icon {
    line-height: 0;
    display: inline-block;
    margin-right: -5px;
    position: relative;
  }
  .small_avatar {
    width: 20px;
    height: 20px;
    @media (min-width: 1921px) {
      width: 1.2vw;
      height: 1.2vw;
    }
  }
  .main_avatr {
    width: 32px;
    height: 32px;
    @media (min-width: 1921px) {
      width: 2vw;
      height: 2vw;
    }
  }
`;

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 16,
  height: 16,
  border: `2px solid transparent`
}));

interface props {
  isIcon?: boolean;
  isDown?: boolean;
  flagImage?: string;
  userImage?: string;
  className?: string;
}

export default function SingleBadge({
  isIcon,
  isDown,
  flagImage,
  userImage,
  className
}: props) {
  return (
    <SingleBadgeWrapper className={className}>
      {isIcon && (
        <i className="icon">
          {!isDown && <img src={assest.trndUp} alt="" width={24} height={22} />}

          {isDown && (
            <img src={assest.trndDown} alt="" width={24} height={22} />
          )}
        </i>
      )}

      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        badgeContent={
          <SmallAvatar
            alt="Remy Sharp"
            src={flagImage}
            className="small_avatar"
          />
        }
      >
        <Avatar alt="Travis Howard" src={userImage} className="main_avatr" />
      </Badge>
    </SingleBadgeWrapper>
  );
}
