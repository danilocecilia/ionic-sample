import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { EnrollmentProvider } from "../../providers/enrollment/enrollment";

@Component({
  selector: "es-enroll",
  templateUrl: "es-enroll.html"
})
export class EsEnrollComponent {
  enrollments: any = {};
  event:any;

  constructor(
    private navCtrl: NavController,
    private enrollmentProvider: EnrollmentProvider,
    private navParams: NavParams
  ) {
    this.event = this.navParams.get("event");
  }

  ngOnInit() {
    this.loadEnrollments();
  }
  loadEnrollments() {
    this.enrollmentProvider
      .loadEnrollments()
      .subscribe(result => {
        this.enrollments = result[0];
      });
  }

  onClickEnrollUsers() {
    this.navCtrl.push(EsEnrollComponent, {});
  }
}
