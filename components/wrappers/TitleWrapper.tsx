import { Box, Typography } from "@mui/material";
import { Image } from "@mui/icons-material";

type TitleWrapperProps = {
  title: string;
  description: string;
  img?: string;
}


export const TitleWrapper = ({title, description, img = ""}: TitleWrapperProps) => {
  return (
    <Box
      bgcolor="white"
      border="24px"
      padding="24px"
      borderRadius="24px"
    >
      <Box
        display="flex"
        justifyContent="space-around"
        alignItems="center"
      >
        <Typography
          color="black"
          sx={{
            fontSize: "27px",
            fontStyle: "normal",
            fontWeight: "590",
            lineHeight: "33px"
          }}
        >
          {title}
        </Typography>
        {
          img !== "" &&
            <Image src={img} alt="logo"/>
        }
      </Box>

      <Typography
        sx={{
          fontSize: "17px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "22px",
          color: "black",
          mt:"20px"
        }}
      >
        {description}
      </Typography>

    </Box>
  )
}