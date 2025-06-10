'use client';
import { useEffect, useState } from 'react';
import styles from './plantAssement.module.css';
import { Box, ThemeProvider } from '@mui/material';
import { AccordionItem } from './plantAssement.model';
import CostProfile from './component/costProfile/CostProfile';
import KpiDefinition from './component/kpiDefinition/KpiDefinition';
import IndustrySelection from './component/industrySelection/IndustrySelection';
import Questionnaires from './component/questionnaires/Questionnaires';
import PlanningHorizon from './component/horizonPlanning/HorizonPlanning';
import theme from '@/theme/theme';
import Preview from './component/preview/Preview';
import Stepper from '@/components/Stepper/Stepper';

const Page = () => {
  const [selectedOption, setSelectedOption] = useState('KPI Selection');

  const steps = ['Cost Profile', 'Planning', 'Industry', 'Kpis'].map((label) => ({ label }));

  function handleOptionSelected(label: string) {
    setSelectedOption(label);
  }

  function mainContentrender() {
    switch (selectedOption) {
      case 'Cost Profile':
        return <CostProfile handleOptionSelected={handleOptionSelected} />;
      case 'KPI Selection':
        return <KpiDefinition handleOptionSelected={handleOptionSelected} />;
      case 'Planning Horizon':
        return <PlanningHorizon handleOptionSelected={handleOptionSelected} />;
      case 'Industry Selection':
        return <IndustrySelection handleOptionSelected={handleOptionSelected} />;
      case 'Questionnaires':
        return <Questionnaires />;
      case 'Preview':
        return <Preview />;

      default:
        break;
    }
  }

  useEffect(() => {
    mainContentrender();
  }, [selectedOption]);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.main_div}>
        <article className={styles.main_article}>
          <Box mt={1}>
            <Stepper steps={steps} />
          </Box>
          <main className={styles.questions_section}>{mainContentrender()}</main>
        </article>
      </div>
    </ThemeProvider>
  );
};

export default Page;
