export interface SurveyDetailResponse {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  product: number;
  credit?: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    nickname: string;
    userType: number;
    credit: string;
  };
  participantCount: number;
  headers: {
    id: number;
    type: number;
    text: string;
    images: string[];
  };
  footers: {
    id: number;
    type: number;
    text: string;
    images: string[];
  };
  questions: {
    id: number;
    type: number;
    title: string;
    text: string;
    images: string[];
    options: string[];
    multipleCount: number;
    maxLength: number;
  }[];
}

export interface SurveyAnswer {
  questionId: number;
  selectedOptions?: string[];
  textAnswer?: string;
  pointValue?: number;
}

export interface SurveySubmission {
  surveyId: number;
  answers: SurveyAnswer[];
}
