import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { HttpModule, Http } from "@angular/http";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AuthHttp, AuthConfig } from "angular2-jwt";
import { Storage, IonicStorageModule } from "@ionic/storage";
import { NgCalendarModule } from "ionic2-calendar";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { File } from "@ionic-native/file";
import { FileTransfer } from "@ionic-native/file-transfer";
import { Toast } from "@ionic-native/toast";
import { Camera } from "@ionic-native/camera";
import { FileChooser } from "@ionic-native/file-chooser";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Globalization } from "@ionic-native/globalization";
// import { LOCALE_ID } from "@angular/core";
// import { registerLocaleData } from "@angular/common";
// import localePt from "@angular/common/locales/pt";
// import localeEs from "@angular/common/locales/es";
// import { NavController } from "ionic-angular";
//import { ComponentsModule  } from "../components/components.module";

/***********************/
//Pages
/***********************/
import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ModalAssessmentPage } from "../pages/modal-assessment/modal-assessment";
import { ModalLogisticPage } from "../pages/modal-logistic/modal-logistic";
import { LibraryPage } from "../pages/library/library";
import { AgendaPage } from "../pages/agenda/agenda";
import { MediaPage } from "../pages/media/media";

/***********************/
//Components
/***********************/
import { HeaderMenuComponent } from "../components/header-menu/header-menu";
import { HeaderCommomComponent } from "../components/header-commom/header-commom";
import { NotificationsComponent } from "../components/notifications/notifications";
import { CurriculumsComponent } from "../components/curriculums/curriculums";
import { CourseStepsComponent } from "../components/course-steps/course-steps";
import { DashboardComponent } from "../components/dashboard/dashboard";
import { AssessmentComponent } from "../components/assessment/assessment";
import { EventSummaryComponent } from "../components/event-summary/event-summary";
import { EsEnrollmentsComponent } from "../components/es-enrollments/es-enrollments";
import { AccordionListComponent } from "../components/accordion-list/accordion-list";
import { EsEnrollComponent } from "../components/es-enroll/es-enroll";
import { EsGradesComponent } from "../components/es-grades/es-grades";
import { EsBillingsComponent } from "../components/es-billings/es-billings";
import { EsLogisticsComponent } from "../components/es-logistics/es-logistics";
import { PrePostTestComponent } from "../components/pre-post-test/pre-post-test";
import { TrainingContentFileComponent } from "../components/training-content-file/training-content-file";

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
import { EnrollmentProvider } from "../providers/enrollment/enrollment";
import { TranslateProvider } from "../providers/translate/translate";

/***********************/
//Modules
/***********************/
import { CurriculumPageModule } from "../pages/curriculum/curriculum.module";
import { ModalNotificationPageModule } from "../pages/modal-notification/modal-notification.module";
import { PasswordRecoveryPageModule } from "../pages/password-recovery/password-recovery.module";
import { TabsPageModule } from "../pages/tabs/tabs.module";
import { AuthPageModule } from "../pages/auth/auth.module";
import { LoadingProvider } from "../providers/loading/loading";
import { ChangePasswordPageModule } from "../pages/change-password/change-password.module";
import { ToastProvider } from "../providers/toast/toast";
import { PipesModule  } from "../pipes/pipes.module";


let storage = new Storage({});

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function getAuthHttp(http: Http) {
  return new AuthHttp(
    new AuthConfig({
      headerPrefix: "JWT",
      noJwtError: true,
      globalHeaders: [{ Accept: "application/json" }],
      tokenGetter: () =>
        storage.get("currentUser").then(u => {
          if (u) return u.Token;
        })
    }),
    http
  );
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalAssessmentPage,
    ModalLogisticPage,
    HeaderCommomComponent,
    HeaderMenuComponent,
    NotificationsComponent,
    DashboardComponent,
    MediaPage,
    LibraryPage,
    CurriculumsComponent,
    AgendaPage,
    CourseStepsComponent,
    AssessmentComponent,
    EventSummaryComponent,
    EsEnrollmentsComponent,
    AccordionListComponent,
    EsEnrollComponent,
    EsGradesComponent,
    EsBillingsComponent,
    EsLogisticsComponent,
    PrePostTestComponent,
    TrainingContentFileComponent,
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: "lmsmsx",
      driverOrder: ["indexeddb", "sqlite", "websql"]
    }),
    HttpModule,
    HttpClientModule,
    NgCalendarModule,
    CurriculumPageModule,
    ModalNotificationPageModule,
    PasswordRecoveryPageModule,
    ChangePasswordPageModule,
    PipesModule,
    TabsPageModule,
    AuthPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalAssessmentPage,
    ModalLogisticPage,
    HeaderCommomComponent,
    HeaderMenuComponent,
    MediaPage,
    NotificationsComponent,
    DashboardComponent,
    LibraryPage,
    CurriculumsComponent,
    AgendaPage,
    CourseStepsComponent,
    AssessmentComponent,
    EventSummaryComponent,
    EsEnrollmentsComponent,
    AccordionListComponent,
    EsEnrollComponent,
    EsGradesComponent,
    EsBillingsComponent,
    EsLogisticsComponent,
    PrePostTestComponent,
    TrainingContentFileComponent,
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
    // {
    //   provide: LOCALE_ID,
    //   useValue: "en-US"
    // },
    TodosProvider,
    AuthProvider,
    FooterProvider,
    CurriculumProvider,
    CompetencyProvider,
    AgendaProvider,
    LibraryProvider,
    NotificationProvider,
    BarcodeScanner,
    Toast,
    EnrollmentProvider,
    LoadingProvider,
    File,
    FileTransfer,
    Camera,
    FileChooser,
    InAppBrowser,
    Globalization,
    ToastProvider,
    TranslateProvider
  ]
})
export class AppModule {}
