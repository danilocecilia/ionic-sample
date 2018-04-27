import { Component, OnInit } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { EsEnrollComponent } from "../es-enroll/es-enroll";
import { EnrollmentProvider } from "../../providers/enrollment/enrollment";
import { LoadingProvider } from "../../providers/loading/loading";

@Component({
  selector: "es-enrollments",
  templateUrl: "es-enrollments.html"
})
export class EsEnrollmentsComponent implements OnInit {
  enrollments: any = {};
  
  constructor(
    private navCtrl: NavController,
    private enrollmentProvider: EnrollmentProvider,
    private loadingProvider: LoadingProvider,
    private navParams: NavParams
  ) {
    this.enrollments = this.navParams.get("enrollments");
    debugger;
  }

  ngOnInit() {
    this.loadingProvider.presentLoadingDefault();
  }

  onClickEnrollUsers() {
    this.navCtrl.push(EsEnrollComponent, { event : this.enrollments});
  }
}
