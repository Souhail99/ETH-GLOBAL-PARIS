import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";

type ProgressBarProps = {
  label: string;
  percent: number;
  params?: string;
}

export const ProgressBar = ({title, description, img = ""}: ProgressBarProps) => {

  return (
    <Box sx={{
      height: "78px",
      width: "100%",
      bgcolor: "transparent",
      border: "1px solid #C7C7CC",
      position: "relative",
      borderRadius: "24px",
      overflow: "hidden",
      zIndex: 1
    }}
    >
      <Box sx={{
        height: "100%",
        width: "22%",
        bgcolor: "#EEEEFB",
        position: "absolute",
        zIndex: 2
      }}/>
      <Box sx={{
        height: "100%",
        width: "100%",
        bgcolor: "transparent",
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        zIndex: 3
      }}>
        <Box display="flex" flexDirection="column">
          <Typography
            sx={{
              fontSize: "17px",
              fontStyle: "normal",
              fontWeight: "590",
              lineHeight: "22px",
              color:"black"
            }}
          >
            Emma Henderson
          </Typography>
          <Typography
            sx={{
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "20px",
              color: "#A8A8A8"
            }}
          >
            42% of vote so far
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#5755D7",
            borderRadius: "20px",
            "&:hover": {
              bgcolor: "rgba(87,85,215,0.93)"
            }
          }}>
          Vote
        </Button>

      </Box>


    </Box>
  )
}