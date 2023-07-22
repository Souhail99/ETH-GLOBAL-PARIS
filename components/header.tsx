import { FC, useState, useRef } from 'react';
import Head from "next/head";
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import React, {useEffect} from 'react' ;
import Link from 'next/link';
import { PaletteMode, useTheme } from '@mui/material';
import Popover from "@mui/material/Popover";
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import Toolbar from "@mui/material/Toolbar";
import Typography from '@mui/material/Typography'; 
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LearnMenuComponent from "./MenuCat";
import { ethers } from "ethers";
interface Props {
    mode: PaletteMode;
    onChange?: () => void;
}


declare var window: any

const Web3=require("web3");


const storage = require('sessionstorage');
//const adressse= storage.getItem('Adresse');

const HeaderComponent: FC<Props> = ({ mode, onChange }) => {
    const customTheme = useTheme ();
    const [openedPopover, setOpenedPopover] = useState(false);

    const popoverAnchor = useRef (null);
    const popoverEnter = () => {
        setOpenedPopover(true);
    }
    const popoverLeave = () => { 
        setOpenedPopover(false);
    }
    const [ currentBalance, setBalance ] = useState(0); 
    const [currentAccount, SetCurrentAccount] = useState({currentAccount: ' ',SetCurrentAccount:''});
    
    const checkWalletIsConnected = () => { 
        const { ethereum }= window;
        if(!ethereum){
            console.log("Metamask ?");
            return;
        }
        else{
            console. log("Yeah, you have a good wallet !");
        }
    }

    const connectWalletHandler = async() => { 
        const { ethereum }= window;
        if(!ethereum){
            console.log("Metamask ?");
            return;
        }
        try{
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            console.log("Yeah, you", accounts[0]);
            SetCurrentAccount(accounts[0]);
            
        }
        catch(error) {
            console.error("Une erreur est survenue", error);
        };
    }
   
 
    const connectWalletButton=() => {
        return (
            <Link href="."> 
                <button onClick={connectWalletHandler} className={styles.btn}>ConnectWallet</button>
            </Link>
        )
    }
    useEffect (() => {
        checkWalletIsConnected();
    },[])

return (
<>
    <Head> 
        <title>Your Zk Identity</title>
        <meta name="description" content="Pre-app for the hackathon" /> 
        <meta name="viewport" content="width-device-width, initial-scale=1" /> 
        <link rel="icon" href="/logo.png" />
    </Head>
    <Box sx={{ flexGrow: 1 }}>
        <AppBar 
            position='fixed'
            sx={{ zIndex: (theme: { zIndex: { drawer: number; }; }) => theme.zIndex.drawer + 1 }}
            style={{
              backgroundColor: customTheme.palette.background.paper,
              color: customTheme.palette.text.primary,
              backgroundImage:"linear-gradient(to top, #051937, #004d7a, #008793, #00bf72, #a8eb12)"
              
            }}
        >
            <Toolbar>
                <Link href='/' passHref>
                  <IconButton 
                  size='large' 
                  edge='start' 
                  color='inherit' 
                  aria-label='menu'
                  sx={{ mr: 2 }}
                  >
                  <p className={styles.className_44d352}>ZkID</p>

                  </IconButton>

                </Link>
            <Box sx={{flexGrow: 1 }} />
            <Box sx={{ display: 'flex', width: 'auto'}}>
                <Typography 
                  onMouseEnter={popoverEnter} 
                  onMouseLeave={popoverLeave} 
                  style={{ cursor: 'pointer' }} 
                  className={styles.className_44d352}
                  variant='h6'
                  component= {'span'} 
                  ref={popoverAnchor}
                  aria-owns={openedPopover ? 'mouse-over-popover': undefined} 
                  aria-haspopup='true'
                >
                  Catégories
                  <KeyboardArrowDownIcon 
                  color='action'
                  sx={{
                    verticalAlign: 'middle', 
                    display: 'inline-flex', 
                    marginRight: '20px',
                  }}
                  />
                </Typography>
                <Popover
                  container={popoverAnchor.current} 
                  id='mouse-over-popover' 
                  open={openedPopover} 
                  anchorEl={popoverAnchor.current}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} 
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }} 
                  PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave,}}
                >
                    <LearnMenuComponent />
                </Popover>
                <Link href='/identity' passHref>
                    <Typography 
                    variant='h6'
                    style={{ cursor: 'pointer', marginRight: '20px'}}
                    className={styles.className_44d352}
                    >
                    Identity
                    </ Typography>
                </Link>
            </Box>
            </Toolbar>
        </AppBar>
    </Box> 

    <main className={styles.main2}> 
        <div className={styles.description}> 
            <p className={styles.className_44d352}>
                &nbsp;Identity ERC :&nbsp;
            </p> 
            <div>
                <a
                href="/" 
                target="_blank" 
                rel="noopener noreferrer"
                >
                    &nbsp;&nbsp;&nbsp;&nbsp;By{' '}

                <Image
                src="/logo.png"
                alt="Hackathon ETH Global Paris" 
                className={styles.vercelLogo} 
                width={100} 
                height={54} 
                priority
                />
                </a>
            </div> 
            <div className={styles.className_44d352}>
                &nbsp;{connectWalletButton()}&nbsp;&nbsp;
            </div> 
            <br></br>
            <div className={styles.className_44d352}>
                User Address : {currentAccount.toString().slice(0, 5)} 
            </div>
         
        </div> 
    </main>
</>
);
};

export default HeaderComponent;