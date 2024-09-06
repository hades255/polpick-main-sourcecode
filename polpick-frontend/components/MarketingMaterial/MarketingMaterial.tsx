import assest from "@/json/assest";
import { MarketingMaterialWrapper } from "@/styles/StyledComponents/MarketingMaterialWrapper";
import CustomPagination from "@/ui/CustomPagination/CustomPagination";
import { Box, Grid } from "@mui/material";
import MarketFilters from "../MarketFilters/MarketFilters";
import MarketingCard, { MarketCardProps } from "./MarketingCard";

const demoMarketingData: MarketCardProps[] = [
  {
    image: assest?.cardImage1,
    bannerId: 363467,
    name: "05/06 Crypto Update",
    fileType: "JPG",
    size: "2019x2019",
    language: "English"
  },
  {
    image: assest?.cardImage2,
    bannerId: 363467,
    name: "05/06 Crypto Update",
    fileType: "JPG",
    size: "2019x2019",
    language: "English"
  },
  {
    image: assest?.cardImage3,
    bannerId: 363467,
    name: "05/06 Crypto Update",
    fileType: "JPG",
    size: "2019x2019",
    language: "English"
  },
  {
    image: assest?.cardImage4,
    bannerId: 363467,
    name: "05/06 Crypto Update",
    fileType: "JPG",
    size: "2019x2019",
    language: "English"
  },
  {
    image: assest?.cardImage5,
    bannerId: 363467,
    name: "05/06 Crypto Update",
    fileType: "JPG",
    size: "2019x2019",
    language: "English"
  },
  {
    image: assest?.cardImage6,
    bannerId: 363467,
    name: "05/06 Crypto Update",
    fileType: "JPG",
    size: "2019x2019",
    language: "English"
  }
];

const MarketingMaterial = () => {
  return (
    <MarketingMaterialWrapper>
      <MarketFilters />
      <Box className="marketing_gallery">
        <Grid container spacing={{ lg: 6, xs: 2 }}>
          {demoMarketingData?.map((data) => (
            <Grid item lg={6} xs={12} key={data?.image}>
              <MarketingCard {...data} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <CustomPagination />
    </MarketingMaterialWrapper>
  );
};

export default MarketingMaterial;
