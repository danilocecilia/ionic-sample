import { observable } from "mobx-angular";

export class Location {
  ID: number;
  @observable Location: string;
  @observable Phone: string;
  @observable Email: string;
  @observable Description: string;
  @observable IsAvailable: boolean;
  //@observable//APIAddress Address ;
  @observable Country: string;
}
