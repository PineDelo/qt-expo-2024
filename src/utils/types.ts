import { Dispatch, SetStateAction } from "react";

export type UserState = {
  isAgree: boolean;
  gender: string;
  originNumber: string;
  formatNumber: string;
  lastSimilarity: number;
  count: number;
  rank: number;
  spectrogram: string;
};

export interface CarouselProps {
  goTo?: (idx?: any) => void;
  func?: () => void;
  user: UserState;
  setUser: Dispatch<SetStateAction<UserState>>;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}
