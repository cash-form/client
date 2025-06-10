export class SurveyFormDto {
  public readonly title: string = "";
  public readonly startDate: string = "";
  public readonly endDate: string = "";
  public readonly description: string = "";
  public readonly headerImages: File[] = [];
  public readonly questions: QuestionDto[] = [];
  public readonly footerText: string = "";
  public readonly footerImages: File[] = [];
  public readonly product: "basic" | "deluxe" | "premium" | "professional" =
    "basic";
}

export class QuestionDto {
  public readonly id: string = "";
  public readonly type: string = "";
  public readonly title: string = "";
}
