import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollSequence from "@/components/ScrollSequence";

import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.navigation}>
        <Header />
      </div>

      <main>
        <div className="relative">
          <ScrollSequence
            frameCount={240}
            scrollLengthVh={500}
            ariaLabel="Quest For Tech story, controlled by scrolling"
          />
          <div className={styles.scrollCue}>Scroll to explore</div>
        </div>

        <section className={styles.afterSequence}>
          <div className={styles.afterInner}>
            <p className={styles.kicker}>Ideas into impact</p>
            <h1 className={styles.statement}>From first idea to connected growth.</h1>

            <div className={styles.afterFooter}>
              <p className={styles.bodyCopy}>
                We pair thoughtful design with dependable technology to create digital
                products that feel clear, useful, and ready for what comes next.
              </p>
              <Link className={styles.link} href="/services">
                Explore our work <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

