export interface AccordionProps {
  arrToList: AccordionItem[];
  handleOptionSelected: (label: string) => void;
}

export interface MultipleSections {
  handleOptionSelected: (label: string) => void;
}

export type AccordionItem = {
  dropDown: boolean;
  label: string;
  dropDownItems?: string[];
};

export interface CostCategory {
  id: string;
  costCategory: string;
  costAsAPercentageOfRevenue?: number;
}
export type CostInputPercentage = {
  costAsAPercentageOfRevenue: number | string;
};

export type CostInput = {
  id: string;
  costCategory: string;
  costAsAPercentageOfRevenue: number;
};

export type FormValues = {
  costs: CostInput[];
};

export type RawCostCategory = {
  id: string;
  costCategory: string;
  costAsAPercentageOfRevenue: string;
};

export interface Kpi {
  id: string;
  kpi: string;
  isselected: boolean;
}

export interface QuestionOption {
  id: string;
  question_uid: string;
  question: string;
  answerOption: string;
  answer?: string | null;
  justification?: string;
}

export interface Props {
  questionOptions: QuestionOption[];
  onNext: (data: { questionId: string; answer: string; justification: string }) => void;
  onBack: () => void;
  isLast: boolean;
  isFirst: boolean;
  selectedAnswer: string;
}

export interface HorizonOption {
  term: string;
  id: string;
  planningHorizon: string;
  termStart: string;
  termEnd: string;
  degreeOfRelevanceCost: string;
  degreeOfRelevanceKpi: string;
  degreeOfInfluenceOnProximityFactors: string;
  isselected: boolean;
}

export interface HorizonFormValues {
  selectedHorizonId: string;
}

export interface Industry {
  id: string;
  industry_name: string;
  isselected: boolean;
}

export interface IndustryFormValues {
  selectedIndustryId: string;
}

export interface KpiFormValues {
  kpis: { isselected: boolean }[];
}
