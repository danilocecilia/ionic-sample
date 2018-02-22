import { Component, OnInit } from "@angular/core";
import { NavController } from "ionic-angular";
import { EsEnrollComponent } from "../es-enroll/es-enroll";
import { EnrollmentProvider } from "../../providers/enrollment/enrollment";
/**
 * Generated class for the EsEnrollmentsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "es-enrollments",
  templateUrl: "es-enrollments.html"
})
export class EsEnrollmentsComponent implements OnInit {
  enrollments: any = {};

  constructor(
    private navCtrl: NavController,
    private enrollmentProvider: EnrollmentProvider
  ) {}

  ngOnInit(){
    this.loadEnrollments();
    
  }
  loadEnrollments() {
    this.enrollmentProvider
      .loadEnrollments()
      .subscribe(res => {
        this.enrollments = res[0];
      });
  }

  onClickEnrollUsers() {
    this.navCtrl.push(EsEnrollComponent, {});
  }
}
