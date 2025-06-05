import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import SendIcon from "@mui/icons-material/Send";
import StarBorder from "@mui/icons-material/StarBorder";
import { AccordionProps } from "../../plantAssement.model";
import styles from "../../plantAssement.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setPlantAssessmentDepartment } from "../../plantAssementSlice";
import { RootState } from "@/store/store";

export default function Accordion_PlantAssement({ arrToList, handleOptionSelected }: AccordionProps) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const dispatch = useDispatch();
  const department = useSelector((state: RootState) => state.plantAssessmentGlobal.questionnairesDeparment);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  function handleDropDownOptionSelected(list: string) {
    console.log(list);
    dispatch(setPlantAssessmentDepartment(list));
  }

  return (
    <List
      sx={{ height: "100%", width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      {arrToList.map((item, index) => (
        <div key={index}>
          <ListItemButton
            onClick={() => {
              handleOptionSelected(item.label);
              item.dropDown && handleClick(index);
            }}
          >
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>

          {item.dropDown && (
            <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
              <div className={styles.scrollableDropdown}>
                {item?.dropDownItems?.map((list, idx) => (
                  <List key={idx} component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4, background: department == list ? "#08ff4a" : "#ebebeb" }}
                      onClick={() => {
                        handleOptionSelected(item.label);
                        handleDropDownOptionSelected(list);
                      }}
                    >
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={list} />
                    </ListItemButton>
                  </List>
                ))}
              </div>
            </Collapse>
          )}
        </div>
      ))}
    </List>
  );
}
