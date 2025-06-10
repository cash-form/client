import { Question, QuestionType } from "src/types/survey";

export class QuestionDto {
  public readonly type: QuestionType;
  public readonly title: string;
  public readonly text: string;
  public readonly images: File[];
  public readonly options: string[];
  public readonly multipleCount: number;
  public readonly maxLength: number;

  constructor(data: Question) {
    this.type = data.type;
    this.title = data.title;
    this.text = data.text;
    this.images = data.images;

    switch (data.type) {
      case "multiple":
        this.options = data.options;
        this.multipleCount = data.multipleCount;
        this.maxLength = 0;
        break;
      case "subjective":
        this.options = [];
        this.multipleCount = 0;
        this.maxLength = 30;
        break;
      case "descriptive":
        this.options = [];
        this.multipleCount = 0;
        this.maxLength = 1000;
        break;
      case "ox":
        this.options = [];
        this.multipleCount = 0;
        this.maxLength = 0;
        break;
      case "point":
        this.options = data.options;
        this.multipleCount = 0;
        this.maxLength = 0;
        break;
    }
  }

  toJSON() {
    return {
      type: this.type,
      title: this.title,
      text: this.text,
      images: this.images,
      options: this.options,
      multipleCount: this.multipleCount,
      maxLength: this.maxLength,
    };
  }
}
