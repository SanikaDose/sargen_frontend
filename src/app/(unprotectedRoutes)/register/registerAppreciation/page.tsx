import InformativeComponent from '@/components/InformativeComponent/InformativeComponent';
import React from 'react';

const page = () => {
  const text = 'Check Email Activation Link has been send';
  return <InformativeComponent content={text} />;
};

export default page;
