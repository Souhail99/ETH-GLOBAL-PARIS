import { FC } from 'react';
import styles from '../styles/Home.module.css';
import Image from "next/image";

interface Props {
    title: string;
    dateString: string;

    mainImageUrl: string;
}

const PropHeaderComponent: FC<Props> = ({
    title, 
    dateString, 
    mainImageUrl,
}) => {
return (
    <div style={{ width: '600px', margin: 'auto' }}> 
        <h1>{title}</h1>
        <Image style={{ width: '600px' }} src={mainImageUrl} />
        <p className={styles.__className_44d3552}>Posted on {dateString}</p>
    </div>
  );
};

export default PropHeaderComponent;
