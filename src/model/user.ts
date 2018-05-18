import { observable } from "mobx-angular";

export class User {
  ID: number;
  @observable Name: string;
  @observable Login: string;
  @observable Email: string;
  @observable Status: string;
  @observable Profile: string;
}
