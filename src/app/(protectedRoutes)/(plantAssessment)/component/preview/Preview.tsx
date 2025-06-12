import { getValueLocalStorage } from '@/app/utils/localStorageGetterSetter';
import QuestionPanel from '@/components/QuestionPanel/QuestionPanel';
import { useParams } from 'next/navigation';
import React from 'react';

const Preview = () => {
  const params = useParams();
  const tenantId = getValueLocalStorage('tenantId');
  console.log(tenantId);

  return (
    <>
      <QuestionPanel />
    </>
  );
};

export default Preview;
