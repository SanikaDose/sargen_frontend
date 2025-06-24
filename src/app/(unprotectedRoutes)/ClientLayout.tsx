'use client';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import RouteIcon from '@mui/icons-material/Route';
import VerifiedIcon from '@mui/icons-material/Verified';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './style.module.css';
import { Props } from './unprotected.types';
import Image from 'next/image';

const ClientLayout = ({ children }: Props) => {
  const chip = [
    {
      icon: <VerifiedIcon sx={{ color: 'green', height: '3vw' }} />,
      text: 'Real Analysis',
    },
    {
      icon: <RouteIcon sx={{ color: 'purple', height: '3vw' }} />,
      text: 'Road Map',
    },
    {
      icon: <EmojiObjectsIcon sx={{ color: 'orange', height: '3vw' }} />,
      text: 'Modern Solution',
    },
  ];
  // const router = usePathname();
  const currentPath = usePathname();
  const getNavItems = () => {
    if (currentPath.includes('/register')) {
      return [
        { label: 'Login', href: '/login' },
        { label: 'Enquiry', href: '/enquiry' },
      ];
    } else if (currentPath.includes('/enquiry')) {
      return [
        { label: 'Register', href: '/register' },
        { label: 'Login', href: '/login' },
      ];
    } else {
      // Default for other pages (like login)
      return [
        { label: 'Register', href: '/register' },
        { label: 'Enquiry', href: '/enquiry' },
      ];
    }
  };
  return (
    <>
      {/* {Nav bar} */}
      <nav className={styles.navbar}>
        <div className={styles.nav_container}>
          <div className={styles.nav_brand}>
            <Image src="/sargen-png-logo.png" alt="logo" className={styles.logo} width={100} height={100} />
          </div>
          <div className={styles.nav_links}>
            {getNavItems().map((item, index) => (
              <Link key={index} href={item.href} className={styles.nav_link}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className={styles.chip}>
        <h1>QA</h1>
      </div>
      <div className={styles.chip2}>
        <h1>Future</h1>
      </div>
      <article className={styles.main_article}>
        <section className={styles.left_section}>
          <figure className={styles.imageWrapper}>
            <video className={styles.videoSetting} autoPlay muted preload="none">
              <source src="/EN-Transforming-Industries-with-Yokogawas-Certified-SIRI-Assessor_4.mp4" type="video/mp4" />
              <track
                src="/EN-Transforming-Industries-with-Yokogawas-Certified-SIRI-Assessor_4.vtt"
                kind="subtitles"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>
          </figure>
          <div className={styles.text_outer_container}>
            <h1>Unlock Your Industry&apos;s Future</h1>
            <p>
              Transform your business with AI-powered roadmaps and strategic insights tailored to your industry&apos;s unique challenges.
            </p>
          </div>

          <section className={styles.chip_outer_div}>
            {chip.map((item, indx) => (
              <span key={indx}>
                {item.icon}
                <h4>{item.text}</h4>
              </span>
            ))}
          </section>
        </section>
        <section className={styles.right_section}>{children}</section>
      </article>
    </>
  );
};

export default ClientLayout;
