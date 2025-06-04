import Image from 'next/image';
import React from 'react';
import styles from './style.module.css';
import login_Image from '../../../public/login_image.svg';
import VerifiedIcon from '@mui/icons-material/Verified';
import RouteIcon from '@mui/icons-material/Route';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { Props } from './unprotected.types';

const layout = ({ children }: Props) => {
  const chip = [
    {
      icon: <VerifiedIcon sx={{ color: 'green', height: '3vw' }} />,
      text: 'Siri Analysis',
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
  return (
    <>
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
        <section className={styles.right_section}>{children}</section>
      </article>
    </>
  );
};

export default layout;
