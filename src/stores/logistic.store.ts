import { observable, action, computed } from "mobx-angular";
import * as mobx from 'mobx'
import { Injectable } from "@angular/core";
import { Logistic, LogisticItemXClass, LogisticItem } from "../model/logistic";

@Injectable()
export class LogisticStore {
  @observable logistic: Logistic;

  constructor() {
  }

  @action
  addLogistic(logistic: LogisticItemXClass) {
    return new Promise((resolse, reject) => {
      if(!this.logistic.LogisticItemsXClass) {
        this.logistic.LogisticItemsXClass = [new LogisticItemXClass()]
      }

      this.logistic.LogisticItemsXClass.push(logistic);
    });
  }

  @action
  deleteLogistic(idLogistic:number) {
    return new Promise((resolve, reject) => {
      let index = this.logistic.LogisticItemsXClass.findIndex(
        lgst => lgst.ID === idLogistic
      );
      this.logistic.LogisticItemsXClass.splice(index, 1);
    });
  }

  @action
  updateLogistic(logistic: LogisticItemXClass) {
    return new Promise((resolse, reject) => {
      let index = this.logistic.LogisticItemsXClass.findIndex(
        lgst => lgst.ID == logistic.ID
      );
      this.logistic.LogisticItemsXClass[index] = logistic;
    });
  }
}
