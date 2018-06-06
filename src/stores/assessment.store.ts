import { observable, action } from "mobx-angular";
import { Injectable } from "@angular/core";
import { Assessment } from "../model/assessment";

@Injectable()
export class AssessmentStore {
  @observable assessment: Assessment;
  constructor() {}

  @action
  getAssessment(obj: Assessment) {
    return new Promise((resolve, reject) => {
      this.assessment = obj;
    });
  }
}
