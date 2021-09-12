export type Rating = {
  value: number;
  text: string;
  id: string;
};

export type Product = {
  id: string;
  name: string;
  ratings: Rating[];
};

export type AddReviewCallback = (reviewText: string, rating: number) => void;
