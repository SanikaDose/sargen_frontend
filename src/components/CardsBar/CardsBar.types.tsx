export type CardsBarCard = {
  title: string;
  value: string | number;
  color?: string;
  description?: string;
};

export type CardsBarProps = {
  heading?: string;
  cards: CardsBarCard[];
};
