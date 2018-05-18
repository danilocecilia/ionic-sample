import { observable } from "mobx-angular";

export class Alternative {
  ID: number;
  @observable Alternative: string;
  @observable IsCorrect: boolean;
}
