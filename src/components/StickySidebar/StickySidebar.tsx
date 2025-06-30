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

interface StickySidebarProps {
  side?: 'left' | 'right';
}

const StickySidebar: React.FC<StickySidebarProps> = ({ side = 'right' }) => {
  const [open, setOpen] = useState(false);

  const isLeft = side === 'left';

  return (
    <div className={`${styles.sidebar} ${open ? styles.open : ''} ${isLeft ? styles.left : styles.right}`}>
      <button className={styles.toggleButton} onClick={() => setOpen(!open)}>
        <ArrowForwardIcon
          style={{
            transform: open ? (isLeft ? 'rotate(180deg)' : 'rotate(0deg)') : isLeft ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'transform 0.3s ease',
          }}
        />
      </button>

      {open && (
        <ul className={`${styles.iconList} ${isLeft ? styles.alignRight : styles.alignLeft}`}>
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
