import { Box, Typography } from "@mui/material";
import { ProgressBar, ProgressBarProps } from "../buttons/ProgressBar";


type VoteWrapperProps = {
  voteData: ProgressBarProps[];
  timeLeft: string;
}


export const VoteWrapper = ({timeLeft, voteData}: VoteWrapperProps) => {

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "white",
        borderRadius: "24px",
        padding: "24px",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          sx={{
            fontSize: "22px",
            fontStyle: "normal",
            fontWeight: "590",
            lineHeight: "28px",
          }}
        >
          Vote
        </Typography>
        <Typography
          sx={{
            color: "#8E8E93",
            fontSize: "17px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "22px"
          }}
        >{timeLeft} left to cats your vote</Typography>
      </Box>

      <Box mt="9px">
        {
          voteData.map((data, index) => (
            <Box key={index} mt="12px">
              <ProgressBar label={data.label} percent={data.percent}/>
            </Box>
          ))
        }
      </Box>
    </Box>
  )
}