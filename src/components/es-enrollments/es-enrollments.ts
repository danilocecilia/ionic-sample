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
  event: any;
  constructor(
    private navCtrl: NavController,
    private enrollmentProvider: EnrollmentProvider,
    private loadingProvider: LoadingProvider,
    private navParams: NavParams
  ) {
    this.event = this.navParams.get("event");
  }

  ngOnInit() {
    this.loadingProvider.presentLoadingDefault();
    this.loadEnrollments();
  }
  loadEnrollments() {
    this.enrollmentProvider.loadEnrollments().subscribe(result => {
      this.loadingProvider.dismissLoading();
      this.enrollments = result[0];
    });
  }

  onClickEnrollUsers() {
    this.navCtrl.push(EsEnrollComponent, { event : this.event});
  }
}
