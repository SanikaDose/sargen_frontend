import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material'; // ✅ named import
import styles from './style.module.css';
import { CardsBarProps } from './CardsBar.types';

const CardsBar: React.FC<CardsBarProps> = ({ heading = 'Overview', cards }) => {
  return (
    <Box className={styles.container}>
      <Typography variant="h4" gutterBottom className={styles.heading}>
        {heading}
      </Typography>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: cards.length <= 3 ? 12 / cards.length : 4 }}>
            <Paper elevation={3} className={styles.card}>
              <Typography variant="h6" className={styles.cardTitle}>
                {card.title}
              </Typography>
              <Typography variant="h4" className={styles.cardValue} sx={{ color: card.color || 'text.primary' }}>
                {card.value}
              </Typography>
              {card.description && <Typography className={styles.cardDescription}>{card.description}</Typography>}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardsBar;
