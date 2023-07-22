import Link from 'next/link';
import * as fs from 'fs'
import { FC, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import styles from '@/styles/Home.module.css'
import { Tag } from '../models/TagAttestation'

const etatetcouleur = require('node-sessionstorage');
const Storage = require('node-storage');


interface Props {
    title: string;
    dateString:string;
    mainImageUrl:string;
    excerpt:string;
    tags:string[];
    mdxString:string;
    mdxContenu:string;
}
export const CardComponent: FC<Props> = ({
    title,
    dateString,
    mainImageUrl,
    excerpt,
    tags,
    mdxString,
    mdxContenu,
}:Props) => {

    const [coulour, setcoulour] = useState("");
    const [letat, setletat] = useState("");

    //const array1 = ["info", "default", "primary", "secondary", "error", "success", "warning"];
    //console.log("Storage: "+ etatST+" "+couleurST);
    function coloration(){
        
        return(
            <Chip label={letat} color = "default"/>
        );

    }
    return (
        <Card sx={{ maxWidth: 385, margin: 'auto' , marginTop: 2 }}>
            <CardMedia component= 'img' height= '100' image={mainImageUrl} />
            <CardContent>
                <Typography gutterBottom variant= 'h5' component= 'div' className={styles.className_44d352}> 
                    {title}
                </Typography>
                <Typography variant='body2' className={styles.className_44d352}>{"Date de création : " +dateString}</Typography>
                <Typography variant='body2' color='text. secondary' className={styles.className_44d352}>
                    {"Résumé : " + excerpt}
                </Typography>
                <Stack style={{marginTop: 24}} direction='row' spacing={1}>
                    {tags.map((tag: string, index: number) => (
                        <Link key={index} href={`/propositions`} passHref>
                            <Chip label={tag} variant='outlined' onClick={() => {}} />
                        </Link>
                    ))}
                    {/* <Chip label-(letat) color={coulour|=undefined &8 array1. includes(coulour) ? coulour : 'default'}/> */} 
                    {coloration ()}
                    {/* <Chip label-(letat) color-"info'/> */}
                </Stack>
            </CardContent>
            <CardActions>
                <Link href={{
                    pathname:`/attestation/details/${title}`,
                    query: {title, mdxString, mdxContenu},
            }}
            as={`/attestation/details/${title}`} >
                    <Button size='small' className={styles.className_44d352}>Voir plus</Button>
                </Link>
            </CardActions>
        </Card>
    );

}