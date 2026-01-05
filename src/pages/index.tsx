import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col col--6">
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>
              Multi-platform API Authentication. Secure, fast, and easy to
              integrate for Android, iOS, Windows, and Web.
            </p>
            <div className={styles.buttons}>
              <Link
                className={clsx("button button--lg", styles.buttonPrimary)}
                to="/docs/intro"
              >
                Get Started 🚀
              </Link>
              <Link
                className={clsx("button button--lg", styles.buttonSecondary)}
                to="https://github.com/baontq23/Logos-API-Authentication"
              >
                GitHub
              </Link>
            </div>

            <div className={styles.platforms}>
              <div className={styles.platformIcon}>
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.523 15.3414L20.355 20.2471c.225.39.091.889-.299 1.114-.39.225-.889.091-1.114-.299l-2.858-4.949c-1.203.576-2.58 1.05-4.084 1.05s-2.881-.474-4.084-1.05l-2.858 4.949c-.225.39-.724.524-1.114.299-.39-.225-.524-.724-.299-1.114l2.832-4.906C4.385 13.978 3 11.652 3 9.0004c0-.644.082-1.268.235-1.863L1.444 4.0354c-.225-.39-.091-.889.299-1.114.39-.225.889-.091 1.114.299l1.837 3.181C6.671 4.298 9.531 3 12.7 3c3.169 0 6.029 1.298 8.006 3.401l1.837-3.181c.225-.39.724-.524 1.114-.299.39.225.524.724.299 1.114l-1.791 3.102c.153.595.235 1.219.235 1.863 0 2.652-1.385 4.978-3.477 6.341h-1.4zM9 11c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1zm8 0c0-.552-.448-1-1-1s-1 .448-1 1 .448 1 1 1 1-.448 1-1z" />
                </svg>
                <span className={styles.platformName}>Android</span>
              </div>
              <div className={styles.platformIcon}>
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.671-1.48 3.674-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.609 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.82-.779.883-1.453 2.333-1.272 3.71 1.338.104 2.714-.688 3.559-1.7z" />
                </svg>
                <span className={styles.platformName}>iOS</span>
              </div>
              <div className={styles.platformIcon}>
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 3.449L9.75 2.1v9.451H0V3.449zM0 12.75h9.75v9.451L0 20.851V12.75zm11.25-10.951L24 0v11.25H11.25V1.799zm0 10.951H24V24l-12.75-1.8z" />
                </svg>
                <span className={styles.platformName}>Windows</span>
              </div>
              <div className={styles.platformIcon}>
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm1 2.05v1.01c2.193.242 4.09 1.442 5.17 3.18H19.2c-1.12-2.126-3.134-3.7-5.5-4.19zm-2 0C8.634 4.55 6.62 6.124 5.5 8.25h1.03C7.61 6.512 9.507 5.312 11.7 5.07V4.05zm4.7 5.2h1.61c.44 1.15.69 2.4.69 3.75s-.25 2.6-.69 3.75h-1.61c.364-1.18.55-2.438.55-3.75s-.186-2.57-.55-3.75zM7.69 9.25c-.364 1.18-.55 2.438-.55 3.75s.186 2.57.55 3.75H6.08C5.64 15.6 5.39 14.35 5.39 13s.25-2.6.69-3.75h1.61zm1.56 0c-.3 1.18-.46 2.44-.46 3.75s.16 2.57.46 3.75h5.5c.3-1.18.46-2.44.46-3.75s-.16-2.57-.46-3.75h-5.5zm1.45 8.5c1.08 1.738 2.977 2.938 5.17 3.18v1.02c-2.366-.49-4.38-2.064-5.5-4.2h1.03zm4.6 0c1.12 2.136 3.134 3.71 5.5 4.2v-1.02c-2.193-.242-4.09-1.442-5.17-3.18h-1.03z" />
                </svg>
                <span className={styles.platformName}>Web</span>
              </div>
            </div>
          </div>

          <div className="col col--6">
            <div className={styles.codePreview}>
              <div className={styles.codeWindow}>
                <div className={styles.codeHeader}>
                  <div className={clsx(styles.dot, styles.dotRed)}></div>
                  <div className={clsx(styles.dot, styles.dotYellow)}></div>
                  <div className={clsx(styles.dot, styles.dotGreen)}></div>
                  <div className={styles.codeTitle}>auth.client.ts</div>
                </div>
                <div className={styles.codeBody}>
                  <pre
                    style={{
                      margin: 0,
                      background: "transparent",
                      color: "#e2e8f0",
                    }}
                  >
                    <code>
                      {`// Initialize Auth Client
const auth = new AuthClient({
  appId: "YOUR_APP_ID",
  apiKey: "YOUR_API_KEY"
});

// Authenticate user
const session = await auth.login({
  method: "DEVICE_ID",
  platform: "android"
});

console.log("Logged in!", session.token);`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
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
      description="APIServer User Guide - Modern API Management Platform"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
