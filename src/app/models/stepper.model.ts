export type Steps = {
  active: number;
  steps: Step[];
};

export type Step = {
  num: number;
  description: string;
  isHidden?: boolean;
};
