export interface ApiUrlConfigType {
  [key: string]: string;
}

export const ApiUrlConfig: ApiUrlConfigType = {
  SURVEYS: "/api/v1/surveys",
  SURVEYS_LIST: "/v1/surveys",
};
