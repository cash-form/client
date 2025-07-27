export const formatPrice = (price: number): string => {
  return `${price.toLocaleString()}원`;
};

export const formatCredit = (credit: number): string => {
  return `${credit.toLocaleString()}크레딧`;
};

export const formatQuestionLimit = (maxQuestions: number): string => {
  return maxQuestions === 0 ? "무제한" : `최대 ${maxQuestions}개`;
};

export const formatAnswerLimit = (maxAnswers: number): string => {
  return maxAnswers === 0 ? "무제한" : `최대 ${maxAnswers}개`;
};

export const formatBaseAnswers = (freeAnswerLimit: number): string => {
  return freeAnswerLimit === 0 ? "무제한 무료" : `${freeAnswerLimit}개 무료`;
};

export const formatExtraAnswerCost = (
  freeAnswerLimit: number,
  additionalAnswerCost: number
): string => {
  return additionalAnswerCost === 0
    ? "추가요금 없음"
    : `${freeAnswerLimit + 1}개부터 ${additionalAnswerCost}원/명`;
};

export const formatImageInsertable = (maxImages: number): string => {
  return maxImages === 0 ? "불가능" : `가능 (최대 ${maxImages}개)`;
};
