export class Logistic {
  constructor(logisticItem: LogisticItem) {
    this.logisticItem = new LogisticItem();
  }
  ID: number;
  Qty: number;
  logisticItem: LogisticItem;
  Cost: number;
  MonetarySymbol: string;
  Date: string;
  Description: string;
}

export class LogisticItem {
  ID: number;
}
