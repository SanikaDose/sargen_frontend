import React, { useEffect, useMemo, useState } from 'react';
import { useGetQuestionnairesListMutation, useSelectQuestionnairesAnswerMutation } from '../../plantAssementApi';

import { useParams } from 'next/navigation';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import QuestionCard from '../questionCard/QuestionCard';
import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';

interface Question {
  id: string;
  question_uid: string;
  question: string;
  answerOption: string;
  answer: string | null;
}

const Questionnaires = () => {
  const tenantId = getValueLocalStorage('tenantId');
  const path = useParams() as { plantAssement?: string[] };

  const department = useSelector((state: RootState) => state.plantAssessmentGlobal.questionnairesDeparment);
  const [getQuestionnairesList] = useGetQuestionnairesListMutation();
  const [selectQuestionnairesAnswer] = useSelectQuestionnairesAnswerMutation();

  const [groupedQuestions, setGroupedQuestions] = useState<{ [key: string]: Question[] }>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const questionUIDs = Object.keys(groupedQuestions);

  const fetchQuestions = async () => {
    setCurrentIndex(0);
    const result = await getQuestionnairesList({
      tenantId,
      plantId: path.plantAssement?.[2] || '',
      department: department || 'R&D',
    }).unwrap();

    // console.log("result ", result);
    const questions = result?.questionsToSend || [];

    const grouped = questions.reduce((acc: { [key: string]: Question[] }, curr: Question) => {
      if (!acc[curr.question_uid]) acc[curr.question_uid] = [];
      acc[curr.question_uid].push(curr);
      return acc;
    }, {});
    setGroupedQuestions(grouped);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [department]);

  const handleNext = async (data: { questionId: string; answer: string; justification: string }) => {
    const currentQuestionUid = questionUIDs[currentIndex];
    const questionGroup = groupedQuestions[currentQuestionUid];

    const questionData = questionGroup.find((q) => q.id === data.questionId);

    if (!questionData) return;

    const payload = {
      tenantId,
      plantId: path.plantAssement?.[2] || '',
      questionnariesData: {
        ...questionData,
        answer: data.answer,
        justification: data.justification,
      },
    };

    await selectQuestionnairesAnswer(payload).unwrap();
    await fetchQuestions();

    if (currentIndex < questionUIDs.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert('Assessment completed!');
    }
  };

  const handleBack = async () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const currentQuestionUid = questionUIDs[currentIndex];
  const currentQuestion = groupedQuestions[currentQuestionUid];

  const selectedAnswer = useMemo(() => {
    return currentQuestion?.find((q) => q.answer)?.answer || '';
  }, [currentQuestion]);

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <QuestionCard
      questionOptions={currentQuestion}
      onNext={handleNext}
      onBack={handleBack}
      isLast={currentIndex === questionUIDs.length - 1}
      isFirst={currentIndex === 0}
      selectedAnswer={selectedAnswer}
    />
  );
};

export default Questionnaires;
