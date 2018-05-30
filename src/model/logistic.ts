import { observable } from "mobx-angular";
import { File } from "../model/file";
import { Class } from "./class";

export class LogisticItemXClass {
  constructor(){
    this.Class = new Class();
  }

  ID: number;
  @observable Class: Class;
  @observable Item: LogisticItem;
  @observable Type: LogisticType;
  @observable Qty: number;
  @observable Cost: number;
  @observable MonetarySymbol: string;
  @observable Files: File[];
  @observable Date: string;
  @observable Description: string;
}

export class Logistic {
  constructor() {
    this.Class = new Class();
    this.LogisticItemsXClass = [new LogisticItemXClass()]
  }

  @observable Class: Class;
  @observable LogisticItemsXClass: LogisticItemXClass[];
}

export class LogisticItem {
  ID: number;
  @observable UnitCost: number;
  @observable MonetarySymbol: string;
}

export class LogisticType {
  ID: number;
}
