import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      {/* Animated geometric shapes */}
      <div className={styles.shapes}>
        <div className={clsx(styles.shape, styles.shape1)}></div>
        <div className={clsx(styles.shape, styles.shape2)}></div>
        <div className={clsx(styles.shape, styles.shape3)}></div>
        <div className={clsx(styles.shape, styles.shape4)}></div>
      </div>

      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Get Started 🚀
          </Link>
        </div>

        <div className={styles.mobileApps}>
          <p className={styles.downloadText}>Download Mobile App</p>
          <div className={styles.appButtons}>
            <a
              href="https://mydash.app.link/download"
              className={styles.appButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://mydash.baontq.dev/assets/img/shape/app_btn1.png"
                alt="Download on App Store"
                className={styles.appButtonImage}
              />
            </a>
            <a
              href="https://mydash.app.link/download"
              className={styles.appButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://mydash.baontq.dev/assets/img/shape/app_btn2.png"
                alt="Get it on Google Play"
                className={styles.appButtonImage}
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Documentation`}
      description="Hướng dẫn sử dụng APIServer - Nền tảng quản lý API hiện đại"
    >
      <HomepageHeader />
    </Layout>
  );
}
