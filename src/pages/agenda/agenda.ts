import { NavController, ModalController } from "ionic-angular/index";
import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { AgendaProvider } from "../../providers/agenda/agenda";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { EventSummaryComponent } from "../../components/event-summary/event-summary";
import { LoadingProvider } from "../../providers/loading/loading";
import { AuthProvider } from "../../providers/auth/auth";
import localePt from "@angular/common/locales/pt";
import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
import { TranslateProvider } from "../../providers/translate/translate";
import { ModalCourseStepsComponent } from "../modal-course-steps/modal-course-steps";

@Component({
  selector: "agenda",
  templateUrl: "agenda.html"
})
export class AgendaPage implements OnInit {
  no: string;
  yes: string;
  events: any;
  eventSource: any;
  viewTitle: string;
  isToday: boolean;
  param: any;
  subtitle: string;
  description: string;
  hideButtons: boolean = false;
  loggedUser: any = {};
  translatedText: string;
  @ViewChild("btnClose") btnClose: any;

  constructor(
    private navController: NavController,
    private alertCtrl: AlertController,
    private agendaProvider: AgendaProvider,
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private loadingProvider: LoadingProvider,
    private authProvider: AuthProvider,
    private translateProvider: TranslateProvider,
    private modalCtrl : ModalController
  ) {
    this.param = this.navParams.data;
  }

  loadLocaleData(culture) {
    if (culture) {
      switch (culture) {
        case "pt-BR":
          registerLocaleData(localePt);
          break;
        case "es-ES":
          registerLocaleData(localeEs);
      }
    }
  }

  calendar = {
    mode: "month",
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function(date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function(date: Date) {
        return "MonMH";
      },
      formatMonthViewTitle: function(date: Date) {
        return "testMT";
      },
      formatWeekViewDayHeader: function(date: Date) {
        return "MonWH";
      },
      formatWeekViewTitle: function(date: Date) {
        return "testWT";
      },
      formatWeekViewHourColumn: function(date: Date) {
        return "testWH";
      },
      formatDayViewHourColumn: function(date: Date) {
        return "testDH";
      },
      formatDayViewTitle: function(date: Date) {
        return "testDT";
      }
    }
  };

  loadData() {
    this.translateYesAndNo();
    // If Instructor clicks on the Calendar on the TabsMenu
    if (this.param.loadType === "general") {
      this.loadEvents();

      this.translateDescription("ConfirmEventSummary");

      this.btnCloseHide(!this.hideButtons);
    } else {
      //It comes from the list of trainings (VCT/Presential) on the Curriculums Page
      this.getEvents(this.param.id);

      this.translateDescription("ConfirmEnrollment");

      this.btnCloseHide(this.hideButtons);
    }
    this.today();
  }

  ngOnInit() {
    this.loggedUser = this.authProvider.loggedUser;

    this.loadLocaleData(this.loggedUser.Language.Culture);

    this.loadingProvider.presentLoadingDefault();

    this.loadData();
  }

  translateDescription(text) {
    this.translateProvider.translateMessage(text).then(res => {
      this.description = `<span cssClass="description">${res}</span>`;
    });
  }

  translateYesAndNo() {
    this.translateProvider.translateMessage("Yes").then(translation => {
      this.yes = translation;
    });

    this.translateProvider.translateMessage("No").then(translation => {
      this.no = translation;
    });
  }

  bindSubTitle(event) {
    let start = moment(event.startTime).format("LT");
    let end = moment(event.endTime).format("LT");
    return (
      `<b>${start}</b> - <b>${end}</b>` +
      `<br>
        Session: <b> ${event.ClassCode} </b>` +
      `<br>
        Seats Status: <b>${event.QtdyEnrolledUsers}/${event.Seats}</b>` +
      `<br>
        Instructor: <b>${event.Instructor}</b>` +
      `<br>
        Location: <b>${event.Location ? event.Location.Location : " - "}</b>` +
      `<br>`
    );
  }

  bindElements(response) {
    if (response) {
      this.events = response;

      this.events.forEach(element => {
        element.startTime = new Date(element.startTime);
        element.endTime = new Date(element.endTime);
      });

      this.eventSource = this.events;
    }
  }

  getEventsByDate(start, end){
    this.agendaProvider
    .getEventsByDates(start, end)
    .then(response => {
      this.loadingProvider.dismissLoading();
      this.bindElements(response);
    })
    .catch(err => {
      this.loadingProvider.dismissLoading();
      console.error(err);
    });
  }


  loadEvents() {
    let firstDayMonth = moment().format("YYYY-MM-01");
    let lastDayMonth = moment().format("YYYY-MM-") + moment().daysInMonth();

    this.getEventsByDate(firstDayMonth, lastDayMonth);
  }

  getEvents(trainingId) {
    this.agendaProvider.getEvents(trainingId).subscribe(res => {
      this.loadingProvider.dismissLoading();
      this.bindElements(res);
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  doConfirm(event) {
    let alert = this.alertCtrl.create({
      title: event.title,
      subTitle: this.bindSubTitle(event),
      message: this.description,
      cssClass: "alertCustomCss",
      buttons: [
        {
          text: this.no,
          handler: () => {
            console.log("No");
          }
        },
        {
          text: this.yes,
          handler: () => {
            if (this.param.loadType === "general") {
              this.navController.push(EventSummaryComponent, { event: event });
            } else {
              let courseStepsModal = this.modalCtrl.create(ModalCourseStepsComponent, {event : event});
              
              courseStepsModal.onDidDismiss(() => {
                this.viewCtrl.dismiss();
              });

              courseStepsModal.present();

              console.log("Yes");
            }
          }
        }
      ]
    });

    alert.present();
  }

  onEventSelected(event) {
    this.doConfirm(event);

    console.log(
      "Event selected:" +
        event.startTime +
        "-" +
        event.endTime +
        "," +
        event.title
    );
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    // console.log(
    //   "Selected time: " +
    //     ev.selectedTime +
    //     ", hasEvents: " +
    //     (ev.events !== undefined && ev.events.length !== 0) +
    //     ", disabled: " +
    //     ev.disabled
    // );
  }

  onCloseModal() {
    this.navController.pop();
  }

  btnCloseHide(value) {
    this.hideButtons = !value;
  }

  onCurrentDateChanged(event: Date) {
    let dateRange = this.getStartAndEndDate(event.getFullYear(), event.getMonth()+1);
    
    this.getEventsByDate(dateRange.start, dateRange.end);
  }

  getStartAndEndDate(year, month) {
    // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
    // array is 'year', 'month', 'day', etc
    var startDate = moment([year, month - 1]).format("YYYY-MM-DD");

    // Clone the value before .endOf()
    var endDate = moment(startDate).endOf('month').format("YYYY-MM-DD");

    // // just for demonstration:
    console.log(startDate);
    console.log(endDate);
    
    // make sure to call toDate() for plain JavaScript date type
    return { start: startDate, end: endDate };
}


  onRangeChanged(ev) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
