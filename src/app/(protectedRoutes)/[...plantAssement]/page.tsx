"use client";
import { useEffect, useState } from "react";
import styles from "./plantAssement.module.css";
import { Button, ThemeProvider } from "@mui/material";
import Accordion_PlantAssement from "./component/accordionPlantAssement/AccordionPlantAssement";
import { AccordionItem } from "./plantAssement.model";
import CostProfile from "./component/costProfile/CostProfile";
import KpiDefinition from "./component/kpiDefinition/KpiDefinition";
import IndustrySelection from "./component/industrySelection/IndustrySelection";
import Questionnaires from "./component/questionnaires/Questionnaires";
import PlanningHorizon from "./component/horizonPlanning/HorizonPlanning";
import theme from "@/theme/theme";
import Preview from "./component/preview/Preview";

const Page = () => {
  const [selectedOption, setSelectedOption] = useState("Cost Profile");

  const dropDownContentList = [
    "R&D",
    "Planning",
    "Production",
    "Quality",
    "Maintenance",
    "Supply Chain-Sales",
    "Supply Chain-Purchase",
    "Utilities",
    "IT",
    "HR/Learning & Dev.",
    "Management",
    "HR",
    "Finance",
  ];

  const list: AccordionItem[] = [
    {
      dropDown: false,
      label: "Cost Profile",
    },
    {
      dropDown: false,
      label: "KPI Selection",
    },
    {
      dropDown: false,
      label: "Planning Horizon",
    },
    {
      dropDown: false,
      label: "Industry Selection",
    },
    {
      dropDown: true,
      label: "Questionnaires",
      dropDownItems: dropDownContentList,
    },
    {
      dropDown: false,
      label: "Preview",
    },
  ];

  function handleOptionSelected(label: string) {
    setSelectedOption(label);
  }

  function mainContentrender() {
    switch (selectedOption) {
      case "Cost Profile":
        return <CostProfile handleOptionSelected={handleOptionSelected} />;
      case "KPI Selection":
        return <KpiDefinition handleOptionSelected={handleOptionSelected} />;
      case "Planning Horizon":
        return <PlanningHorizon handleOptionSelected={handleOptionSelected} />;
      case "Industry Selection":
        return <IndustrySelection handleOptionSelected={handleOptionSelected} />;
      case "Questionnaires":
        return <Questionnaires />;
      case "Preview":
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
        <aside className={styles.sidebar}>
          <Accordion_PlantAssement arrToList={list} handleOptionSelected={handleOptionSelected} />
        </aside>
        <article className={styles.main_article}>
          <section className={styles.home_button_section}>
            <h1 className={styles.home_button_section_h1}>Plant Assement</h1>
            <h2 className={styles.home_button_section_h2}>{selectedOption}</h2>
            <Button variant="contained">Home</Button>
          </section>
          <main className={styles.questions_section}>{mainContentrender()}</main>
        </article>
      </div>
    </ThemeProvider>
  );
};

export default Page;
