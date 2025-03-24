export type TSelectOption = {
    name: string;
    id: number;
    range: string;
}

export interface ISelectProps { 
  options: TSelectOption[];
  placeholder?: string;
}

