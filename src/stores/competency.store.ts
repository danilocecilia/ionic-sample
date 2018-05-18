import { observable, action, computed } from "mobx-angular";
import { Injectable } from "@angular/core";
import { Competency, HistoryCompetency } from "../model/competency";

@Injectable()
export class CompetencyStore {
  @observable competency: Competency;
  @observable history: HistoryCompetency;
  @observable progress: number;
  constructor() {}

  @action
  getCompetency(obj: Competency) {
    return new Promise((resolve, reject) => {
      this.competency = obj;
      this.history = this.competency.Competency[0].History;
      this.progress = this.competency.Competency[0].Percentage;
      resolve();
    });
  }

  @action
  slideChanged(currentIndex) {
    if (this.competency.Competency[currentIndex]) {
      this.history = this.competency.Competency[currentIndex].History;
      this.progress = this.competency.Competency[currentIndex].Percentage;
    }
  }
}
