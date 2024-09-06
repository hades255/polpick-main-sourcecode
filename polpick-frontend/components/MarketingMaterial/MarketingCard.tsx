import { MarketingCardWrapper } from "@/styles/StyledComponents/MarketingMaterialWrapper";
import MessageIcon from "@/ui/Icons/MessageIcon";
import ShopIcon from "@/ui/Icons/ShopIcon";
import StarIcon from "@/ui/Icons/StarIcon";
import {
  Box,
  Button,
  List,
  ListItem,
  StackProps,
  Typography
} from "@mui/material";
import Image from "next/image";
import React from "react";

export interface MarketCardProps {
  image: string;
  bannerId: number;
  name: string;
  fileType: string;
  size: string;
  language: string;
}

const MarketingCard: React.FC<StackProps & MarketCardProps> = ({
  image,
  bannerId,
  name,
  fileType,
  size,
  language,
  ...others
}) => {
  return (
    <MarketingCardWrapper direction="row" alignItems="center" flexWrap="wrap">
      <Box className="card_fig">
        <figure>
          <Image src={image} alt="card image" width={142} height={142} />
        </figure>
      </Box>
      <Box className="card_list">
        <List disablePadding>
          <ListItem disablePadding>
            <Typography>Banner ID</Typography>
            <Typography>{bannerId}</Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography>Name</Typography>
            <Typography>{name}</Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography>File type</Typography>
            <Typography>{fileType}</Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography>Size</Typography>
            <Typography>{size}</Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography>Language</Typography>
            <Typography>{language}</Typography>
          </ListItem>
        </List>
      </Box>
      <List className="feature_list" disablePadding>
        <ListItem disablePadding>
          <Button startIcon={<StarIcon />} />
        </ListItem>
        <ListItem disablePadding>
          <Button startIcon={<MessageIcon />} />
        </ListItem>
        <ListItem disablePadding>
          <Button startIcon={<ShopIcon />} />
        </ListItem>
      </List>
    </MarketingCardWrapper>
  );
};

export default MarketingCard;
