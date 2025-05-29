'use client';
import Image from 'next/image';
import styles from './style.module.css';
import login_Image from '../../../../public/login_image.svg';
import VerifiedIcon from '@mui/icons-material/Verified';
import RouteIcon from '@mui/icons-material/Route';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

export default function Page() {
  const chip = [
    {
      icon: <VerifiedIcon sx={{ color: 'green' }} />,
      text: 'Siri Analysis',
    },
    {
      icon: <RouteIcon sx={{ color: 'purple' }} />,
      text: 'Road Map',
    },
    {
      icon: <EmojiObjectsIcon sx={{ color: 'orange' }} />,
      text: 'Modern Solution',
    },
  ];

  return (
    <article className={styles.main_article}>
      <div className={styles.chip}>
        <h1>QA</h1>
      </div>
      <div className={styles.chip2}>
        <h4>Future</h4>
      </div>
      <section className={styles.left_section}>
        <figure className={styles.imageWrapper}>
          <Image src={login_Image} alt="image" fill className={styles.login_image} />
        </figure>
        <div className={styles.text_outer_container}>
          <h1>Unlock Your Industry&apos;s Future</h1>
          <p>
            Transform your business with AI-powered roadmaps and strategic insights tailored to your industry&apos;s
            unique challenges.
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
      <section className={styles.right_section}>{/* <AuthForm mode="register" /> */}</section>
    </article>
  );
}
