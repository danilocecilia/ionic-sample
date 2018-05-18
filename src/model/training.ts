import { observable } from "mobx-angular";

export class Training {
  ID: number;
  @observable Training: string;
  @observable Code: string;
  @observable Category: string;
  @observable Thumbnail: string;
  @observable Summary: string;
  @observable Cost: number;
  @observable MonetarySymbol: string;
  @observable CompletionExpirationDays: number;
}
