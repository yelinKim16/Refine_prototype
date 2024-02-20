export type IDepartment = "개발부" | "인사부" | "영업부";

export interface IMealHistory {
  id: number;
  empNo: number;
  empNm: string;
  empType: string;
  companyNm: string;
  departmentNm: IDepartment;
  positionNm: string;
  mealType: string;
  mealDt: Date;
}

export interface IMealUser {
  id: number;
  empNm: string;
  empType: string;
  companyNm: string;
  departmentNm: string;
  positionNm: string;
  createDt: number;
  modifyDt: number;
}

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export interface IMealHistoryFilterVariables {
  q: string;
  category: string;
  departmentNm: IDepartment;
}

export interface IMealUserFilterVariables {
  q: string;
  category: string;
  departmentNm: IDepartment;
}

export interface ISetting {
  id: number;
  name: string;
  time: string;
}

export interface FormValues {
  name?: string;
  time?: string;
}

export interface IWorkPlace {
  id: number;
  name: string;
  category: string;
  companyNm: string;
  type: string;
}

export interface IEntryDoor {
  id: number;
  name: string;
  workPlace: {
    id: number;
    name: string;
    category: string;
    companyNm: string;
    type: string;
  };
  type: string;
  category: string;
}
