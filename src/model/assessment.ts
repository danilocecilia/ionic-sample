import { observable } from "mobx-angular";
import { Question } from "./question";
import { Training } from "./training";

export class Assessment {
  ID: number;
  @observable Code: string;
  @observable Training: Training;
  @observable Questions: Question[];
  @observable MinimumGrade: number;
  @observable QtyQuestion: number;
  @observable Retakes: number;
  @observable Type: AssessmentType;
  @observable IsAvailable: boolean;
}

enum AssessmentType {
  PRE_TEST,
  POST_TEST,
  BOTH
}
