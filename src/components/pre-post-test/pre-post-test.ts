import { Component, OnInit } from "@angular/core";
import { AssessmentStore } from "../../stores/assessment.store";
import { AssessmentProvider } from "../../providers/assessment/assessment";
import { Assessment } from "../../model/assessment";
import { ResolvedAssessment, ResolvedQuestion } from "../../model/resolved-assessment";
import { LoadingProvider } from "../../providers/loading/loading";

@Component({
  selector: "pre-post-test",
  templateUrl: "pre-post-test.html"
})
export class PrePostTestComponent implements OnInit {
  hide: boolean = false;
  resolvedAssessment: ResolvedAssessment = new ResolvedAssessment();
  arrayResolvedQuestion: ResolvedQuestion[] = [];
  
  constructor(
    private assessmentStore: AssessmentStore, 
    private assessmentProvider: AssessmentProvider,
    private loadingProvider: LoadingProvider) {
    this.resolvedAssessment.Questions = this.arrayResolvedQuestion;
  }

  ngOnInit() {
    this.assessmentProvider.getAssessment(7);
    this.resolvedAssessment.ID_Assessment = 7;
    this.resolvedAssessment.ID_Class = 11;
    console.log(this.assessmentStore);
  }

  bindValue(item){
    let resolvedQuestion: ResolvedQuestion = new ResolvedQuestion();
    resolvedQuestion.ID_Question = item.ID_Question;
    resolvedQuestion.ID_Alternative = item.ID;

    if(this.resolvedAssessment.Questions.length > 0){
      let hasAlreadyAnswered = this.resolvedAssessment.Questions.find(question => question.ID_Question === item.ID_Question);

      if(hasAlreadyAnswered){
        this.removeResolvedQuestion(item);

        this.resolvedAssessment.Questions.push(resolvedQuestion);
      }
      else{
        this.resolvedAssessment.Questions.push(resolvedQuestion);
      }
    }
    else{
      this.resolvedAssessment.Questions.push(resolvedQuestion);
    }
  }

  private removeResolvedQuestion(item: any) {
    let index = this.resolvedAssessment.Questions.findIndex(ra => ra.ID_Question === item.ID_Question && ra.ID_Alternative === item.ID);
    this.resolvedAssessment.Questions.splice(index, 1);
  }

  onClickSubmitEvaluation() {
    this.loadingProvider.presentLoadingDefault();
    this.assessmentProvider.addResolvedAssessment(this.resolvedAssessment)
    .then(response => {
      this.loadingProvider.dismissLoading();
      this.hide = true;
    }).catch(err => {
      this.loadingProvider.dismissLoading();
      console.log(err);
    });
  }
}
