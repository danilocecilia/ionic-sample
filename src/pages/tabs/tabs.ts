import { Component } from "@angular/core";
import { App } from "ionic-angular";

import { HomePage } from "../home/home";
import { CurriculumPage } from "../curriculum/curriculum";
import { Events } from "ionic-angular";
import { AgendaComponent } from "../../components/agenda/agenda";
import { LibraryComponent } from "../../components/library/library";
import { MediaComponent } from "../../components/media/media";
import { DashboardComponent } from "../../components/dashboard/dashboard";
import { CourseStepsComponent } from "../../components/course-steps/course-steps";
import { AssessmentComponent } from "../../components/assessment/assessment";
import { EventSummaryComponent } from "../../components/event-summary/event-summary";
import { EsEnrollmentsComponent } from "../../components/es-enrollments/es-enrollments";
import { EsEnrollComponent } from "../../components/es-enroll/es-enroll";
import { EsGradesComponent } from "../../components/es-grades/es-grades";
import { EsBillingsComponent } from "../../components/es-billings/es-billings";
import { EsLogisticsComponent } from "../../components/es-logistics/es-logistics";
import { PrePostTestComponent } from "../../components/pre-post-test/pre-post-test";
import { TrainingContentFileComponent } from "../../components/training-content-file/training-content-file";
import { TestPage } from "../test/test";
import { UserProfilePage } from "../user-profile/user-profile";
import { ChangePasswordPage } from "../change-password/change-password";
import { PasswordRecoveryPage } from "../password-recovery/password-recovery";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = CurriculumPage;
  tab3Root: any = AgendaComponent;
  tab4Root: any = LibraryComponent;
  tab5Root: any = MediaComponent;

  constructor(public appCtrl: App, public events: Events) {}

  resetHeader() {
    // this.events.publish('hideHeader', { isHidden: false });
  }
}
