import { useState } from 'react';
import CostProfile from './CostProfile';

function CostProfilePage() {
  const [selectedOption, setSelectedOption] = useState('cost profile');
  function handleOptionSelected(label: string) {
    setSelectedOption(label);
  }

  return <CostProfile handleOptionSelected={handleOptionSelected} />;
}

export default CostProfilePage;
