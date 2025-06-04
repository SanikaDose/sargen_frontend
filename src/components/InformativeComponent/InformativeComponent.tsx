"use client";
import { Button, Typography } from "@mui/material";
import styles from "./informativeComponent.module.css";

type Paramters = {
  content: string;
  behaviour?: () => void;
};

const InformativeComponent = ({ content, behaviour }: Paramters) => {
  return (
    <article className={styles.outerContainer}>
      <Typography variant="h3" className={styles.content}>
        {content}
      </Typography>
      {behaviour && (
        <Button variant="contained" onClick={behaviour}>
          Active Account
        </Button>
      )}
    </article>
  );
};

export default InformativeComponent;
