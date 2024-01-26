export type IDepartment = "development" | "sales" | "humanResource";

export interface IMealHistory {
  id: number;
  empNo: number;
  empNm: string;
  empType: string;
  companyNm: string;
  departmentNm: IDepartment;
  positionNm: string;
  mealType: string;
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
