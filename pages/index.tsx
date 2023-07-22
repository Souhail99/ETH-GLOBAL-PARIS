import styles from '../styles/Home.module.css'
import { DescriptionWrapper } from "../components/wrappers/DescriptionWrapper";
import { TitleWrapper } from "../components/wrappers/TitleWrapper";
import MPImage from "../img/MenloPark.png";
import { ProgressBar } from "../components/buttons/ProgressBar";
import { Box } from "@mui/material";


export default function Home(){

  const pollData = {
    title: "2023 Mayor Election",
    subtitle: "The 2023 Mayoral Election in Menlo Park features two candidates, Councillor Emma Henderson and entrepreneur Mr. David Strauss.",
    img: MPImage,
    description:
      [
        "The Menlo Park Election Committee hereby informs the public of the official commencement of the 2023 Mayoral Election. This election features two candidates who have formally declared their intentions to run for the position of Mayor.",
        "The first candidate is Councillor Emma Henderson, a member of the City Council. Councillor Henderson’s campaign is oriented around areas such as sustainable city development, governmental transparency, and the enhancement of educational facilities within Menlo Park.",
        "The second candidate is Mr. David Strauss, a local entrepreneur. Mr. Strauss's campaign focuses on the modernization of city infrastructure, the promotion of the technology sector, and the fostering of an environment conducive to entrepreneurship within Menlo Park.",
        "The Menlo Park Election Committee would like to remind all eligible voters to actively participate in this democratic process. It is the collective effort of all residents that will shape the future of our city. We look forward to a fair election season.",
      ]
  }

  return (
    <>
      <main className={styles.main}>
        <Box display="flex" flexDirection="column">
          <TitleWrapper title={pollData.title} description={pollData.subtitle} img={MPImage}/>
          <DescriptionWrapper title={"Description"} content={pollData.description}/>
          <ProgressBar label={"test"} percent={32}/>
        </Box>
      </main>
    </>
  )
}
