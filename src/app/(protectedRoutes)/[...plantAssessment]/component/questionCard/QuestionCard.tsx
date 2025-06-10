import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import styles from "./questionCard.module.css";
import { Props } from "../../plantAssement.model";

const QuestionCard: React.FC<Props> = ({ questionOptions, onNext, onBack, isLast, isFirst }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ answer: string; justification: string }>({
    defaultValues: { answer: "", justification: "" },
  });

  const question = questionOptions?.[0];
  const defaultAnswer = question?.answer ?? "";

  useEffect(() => {
    reset({
      answer: defaultAnswer,
      justification: question?.justification || "",
    });
  }, [defaultAnswer, question?.question_uid, question?.justification, reset]);

  const onSubmit = (data: { answer: string; justification: string }) => {
    const selectedOption = questionOptions.find((opt) => opt.answerOption === data.answer);

    if (!selectedOption) {
      console.error("Selected answer does not match any option.");
      return;
    }

    onNext({ questionId: selectedOption.id, answer: data.answer, justification: data.justification });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Typography variant="h6" className={styles.questionText}>
        {`${question?.question_uid}. ${question?.question}`}
      </Typography>

      <FormControl className={styles.radioGroup}>
        <Controller
          name="answer"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} value={field.value}>
              {questionOptions.map((opt) => (
                <FormControlLabel className={styles.labels} key={opt.id} value={opt.answerOption} control={<Radio />} label={opt.answerOption} />
              ))}
            </RadioGroup>
          )}
        />
      </FormControl>

      <Controller
        name="justification"
        control={control}
        rules={{ required: "Justification is required", minLength: { value: 1, message: "Must be at least 1 character" } }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Justification"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            error={!!errors.justification}
            helperText={errors.justification?.message}
            className={styles.textArea}
          />
        )}
      />

      <Box className={styles.buttonGroup}>
        <Button onClick={onBack} disabled={isFirst} variant="outlined" className={styles.backButton}>
          Back
        </Button>
        <Button type="submit" variant="contained" className={styles.submitButton}>
          {isLast ? "Submit" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default QuestionCard;
