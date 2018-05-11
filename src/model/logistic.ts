export class Logistic {
  ID: number;
  Qty: number;
  Item: LogisticItem;
  Cost: number;
  MonetarySymbol: string;
  Date: string;
  Description: string;
  Type: LogisticType
}

export class LogisticItem {
  ID: number;
}

export class LogisticType{
  ID: number;
}
