export interface Action {
  id: string;
  name: string;
  content: string;
  condition: string;
  includeSurvey: boolean;
  createdAt: string;
}

export interface ActionsResponse {
  data: Action[];
  status: boolean;
  detail: null | string;
}