export interface IMealHistory {
  id: number;
  empNo: number;
  empNm: string;
  companyNm: string;
  departmentNm: string;
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
