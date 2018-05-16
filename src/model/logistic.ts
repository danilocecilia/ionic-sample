import { observable } from "mobx-angular";
import { File } from "../model/file";
import { Class } from "./class";

export class Logistic {
  [x: string]: any;
  ID: number;
  @observable Item: LogisticItem;
  @observable Type: LogisticType
  @observable Class: Class
  @observable Qty: number;
  @observable Cost: number;
  @observable MonetarySymbol: string;
  @observable Files: File[]
  @observable Date: string;
  @observable Description: string;
}

export class LogisticItem {
  ID: number;
  @observable UnitCost: number;
  @observable MonetarySymbol: string;
}

export class LogisticType{
  ID: number;
}
