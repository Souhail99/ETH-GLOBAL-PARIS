import { Box, Typography } from "@mui/material";


type VoteWrapperProps = {
  voteData: {
    label: string;
    percentage: number;
    id: string;
  }
  timeLeft: string;
}


export const VoteWrapper = ({title, description, img = ""}: VoteWrapperProps) => {

  return (
    <Box sx={{
      height: "78px",
      width: "100%",
      bgcolor: "white",
      border: "1px solid #C7C7CC",
    }}>
    </Box>
  )
}