import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { EnrollmentProvider } from "../../providers/enrollment/enrollment";

/**
 * Generated class for the EsEnrollComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "es-enroll",
  templateUrl: "es-enroll.html"
})
export class EsEnrollComponent {
  enrollments: any = {};
  constructor(
    private navCtrl: NavController,
    private enrollmentProvider: EnrollmentProvider
  ) {}

  ngOnInit() {
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
