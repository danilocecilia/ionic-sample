import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { HttpModule, Http } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { Storage, IonicStorageModule } from "@ionic/storage";
import { NgCalendarModule } from "ionic2-calendar";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Toast } from "@ionic-native/toast";

//import { ComponentsModule  } from "../components/components.module";

/***********************/
//Pages
/***********************/
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ModalAssessmentPage } from "../pages/modal-assessment/modal-assessment";
//import { ModalNotificationPage } from '../pages/modal-notification/modal-notification';
//import { PasswordRecoveryPage } from '../pages/password-recovery/password-recovery';
// import { CurriculumPage } from '../pages/curriculum/curriculum';
//import { TabsPage } from '../pages/tabs/tabs';

/***********************/
//Components
/***********************/
import { HeaderMenuComponent } from "../components/header-menu/header-menu";
import { HeaderCommomComponent } from "../components/header-commom/header-commom";
import { NotificationsComponent } from "../components/notifications/notifications";
import { CurriculumsComponent } from "../components/curriculums/curriculums";
import { AgendaComponent } from "../components/agenda/agenda";
import { CourseStepsComponent } from "../components/course-steps/course-steps";
import { LibraryComponent } from "../components/library/library";
import { MediaComponent } from "../components/media/media";
import { DashboardComponent } from "../components/dashboard/dashboard";
import { AssessmentComponent } from "../components/assessment/assessment";
import { EventSummaryComponent  } from "../components/event-summary/event-summary";
/***********************/
//Providers
/***********************/
import { TodosProvider } from "../providers/todos/todos";
import { AuthProvider } from "../providers/auth/auth";
import { FooterProvider } from "../providers/footer/footer";
import { CurriculumProvider } from "../providers/curriculum/curriculum";
import { CompetencyProvider } from "../providers/competency/competency";
import { AgendaProvider } from "../providers/agenda/agenda";
import { LibraryProvider } from "../providers/library/library";
import { NotificationProvider } from "../providers/notification/notification";

import { CurriculumPageModule } from "../pages/curriculum/curriculum.module";
import { ModalNotificationPageModule } from "../pages/modal-notification/modal-notification.module";
import { PasswordRecoveryPageModule } from "../pages/password-recovery/password-recovery.module";
import { TabsPageModule } from "../pages/tabs/tabs.module";
import { AuthPageModule } from "../pages/auth/auth.module";

let storage = new Storage({});

export function getAuthHttp(http: Http) {
  return new AuthHttp(
    new AuthConfig({
      headerPrefix: "JWT",
      noJwtError: true,
      globalHeaders: [{ Accept: "application/json" }],
      tokenGetter: () => storage.get("token")
    }),
    http
  );
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalAssessmentPage,
    HeaderCommomComponent,
    HeaderMenuComponent,
    NotificationsComponent,
    DashboardComponent,
    MediaComponent,
    LibraryComponent,
    CurriculumsComponent,
    AgendaComponent,
    CourseStepsComponent,
    AssessmentComponent,
    EventSummaryComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: "cloudo"
      // ,
      // driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpModule,
    HttpClientModule,
    NgCalendarModule,
    CurriculumPageModule,
    ModalNotificationPageModule,
    PasswordRecoveryPageModule,
    TabsPageModule,
    AuthPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalAssessmentPage,
    HeaderCommomComponent,
    HeaderMenuComponent,
    MediaComponent,
    NotificationsComponent,
    DashboardComponent,
    LibraryComponent,
    CurriculumsComponent,
    AgendaComponent,
    CourseStepsComponent,
    AssessmentComponent,
    EventSummaryComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    TodosProvider,
    AuthProvider,
    FooterProvider,
    CurriculumProvider,
    CompetencyProvider,
    AgendaProvider,
    LibraryProvider,
    NotificationProvider,
    BarcodeScanner,
    Toast
  ]
})
export class AppModule {}
