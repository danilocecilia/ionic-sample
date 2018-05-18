import { observable } from "mobx-angular";
import { Alternative } from "./alternative";

export class Question {
  ID: number;
  @observable Question: string;
  @observable Tag: string;
  @observable IsAvailable: boolean;
  @observable Alternatives: Alternative[];
}
