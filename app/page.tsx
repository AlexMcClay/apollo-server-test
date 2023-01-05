import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";

import ASD from "./ASD";

import Test from "./Test";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <Test />
        <div>
          <ASD />
        </div>
      </div>
    </main>
  );
}
