import { observable, action, computed } from "mobx-angular";
import { Injectable } from "@angular/core";
import { Logistic } from "../model/logistic";

@Injectable()
export class LogisticStore {
  @observable logistic: Logistic;

  constructor() {
    // this.getData().then(() => {
    //   mobx.autorun(() => this.saveData());
    // });
    // this.getData(this.idClass);
  }

  // public getData(idClass: number) {
  //   return this.logisticProvider.getLogisticsByClass(idClass).then(data => {
  //     this.logistic = data;
  //   });
  // }

  // private saveData() {
  //   if (this.logistic.LogisticItemsXClass) {
  //     this.logistic.LogisticItemsXClass.forEach(element => {
  //       this.logisticProvider.updateLogistic(element).catch(() => {
  //         console.error("Uh oh... something went wrong, reloading data...");
  //         this.getData();
  //       });
  //     });
  //   }

  //   return this.logistic;
  // }

  @action
  addLogistic(logistic: Logistic) {
    return new Promise((resolse, reject) => {
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
  updateLogistic(logistic: Logistic) {
    return new Promise((resolse, reject) => {
      let index = this.logistic.LogisticItemsXClass.findIndex(
        lgst => lgst.ID == logistic.ID
      );
      this.logistic.LogisticItemsXClass[index] = logistic;
    });
  }
}
