import React, { useState } from 'react';
import styles from './style.module.css';
import { SidebarIconType } from './StickySidebar.type';
import HomeIcon from '@mui/icons-material/Home';
import UploadIcon from '@mui/icons-material/Upload';
import InfoIcon from '@mui/icons-material/Info';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const iconList: SidebarIconType[] = [
  { id: 'home', icon: <HomeIcon />, label: 'Home' },
  { id: 'upload', icon: <UploadIcon />, label: 'Upload' },
  { id: 'info', icon: <InfoIcon />, label: 'Info' },
];

const StickySidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      <button className={styles.toggleButton} onClick={() => setOpen(!open)}>
        <ArrowForwardIcon />
      </button>
      {open && (
        <ul className={styles.iconList}>
          {iconList.map((item) => (
            <li key={item.id} className={styles.iconItem}>
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StickySidebar;
