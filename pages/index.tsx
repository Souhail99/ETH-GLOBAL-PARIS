import styles from "../styles/Home.module.css";
import { SismoConnectComponent } from "../components/buttons/SismoConnectButton";
import { GlassMorphWrapper } from "../components/modals/GlassMorphWrapper";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <GlassMorphWrapper>
          <SismoConnectComponent />
        </GlassMorphWrapper>
      </main>
    </>
  );
}
