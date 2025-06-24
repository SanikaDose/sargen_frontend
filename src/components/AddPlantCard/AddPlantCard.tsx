import { Box, CardContent, Typography } from '@mui/material';
import styles from './style.module.css';
import { AddPlantCardProps } from './AddPlantCards.types';

function AddPlantCard({ label, backgroundColor, onClick }: AddPlantCardProps) {
  return (
    <Box
      className={styles.addPlantCard}
      style={{ background: backgroundColor }} // Keep dynamic background inline
      onClick={onClick}
    >
      {/* this is an svg icon for plant  */}
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path
          d="M4 42V6H23.5V14.25H44V31.25H41V17.25H23.5V22.5H27.5V25.5H23.5V30.75H27.5V33.75H23.5V39H33.25V42H4ZM7 39H12.25V33.75H7V39ZM7 30.75H12.25V25.5H7V30.75ZM7 22.5H12.25V17.25H7V22.5ZM7 14.25H12.25V9H7V14.25ZM15.25 39H20.5V33.75H15.25V39ZM15.25 30.75H20.5V25.5H15.25V30.75ZM15.25 22.5H20.5V17.25H15.25V22.5ZM15.25 14.25H20.5V9H15.25V14.25ZM40.65 46V41.65H36.25V38.65H40.65V34.25H43.65V38.65H48V41.65H43.65V46H40.65ZM32.75 25.5V22.5H35.75V25.5H32.75ZM32.75 33.75V30.75H35.75V33.75H32.75Z"
          fill="#1C1B1F"
        />
      </svg>
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      </CardContent>
    </Box>
  );
}

export default AddPlantCard;
