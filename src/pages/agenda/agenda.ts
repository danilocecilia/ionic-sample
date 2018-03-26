import { NavController } from "ionic-angular/index";
import { Component, OnInit, ViewChild } from "@angular/core";
import * as moment from "moment";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { AgendaProvider } from "../../providers/agenda/agenda";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { CourseStepsComponent } from "../../components/course-steps/course-steps";
import { EventSummaryComponent } from "../../components/event-summary/event-summary";
import { LoadingProvider } from "../../providers/loading/loading";
import { AuthProvider } from "../../providers/auth/auth";
import localePt from "@angular/common/locales/pt";
import localeEs from "@angular/common/locales/es";
import { registerLocaleData } from "@angular/common";
import { TranslateProvider } from "../../providers/translate/translate";

@Component({
  selector: "agenda",
  templateUrl: "agenda.html"
})
export class AgendaPage implements OnInit {
  events: any;
  eventSource: any;
  viewTitle: string;
  isToday: boolean;
  param: any;
  subtitle: string;
  description: string;
  hide: boolean = false;
  loggedUser: any = {};

  @ViewChild("btnClose") btnClose: any;

  constructor(
    private navController: NavController,
    private alertCtrl: AlertController,
    private agendaProvider: AgendaProvider,
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private loadingProvider: LoadingProvider,
    private authProvider: AuthProvider,
    private translateProvider: TranslateProvider
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

  reloadData(){
    this.loadingProvider.presentLoadingDefault();
    this.loadEvents();
    this.today();
    this.loadingProvider.dismissLoading();
  }

  ngOnInit() {
    this.loggedUser = this.authProvider.loggedUser;
    
    this.loadLocaleData(this.loggedUser.Language.Culture);
    
    this.loadingProvider.presentLoadingDefault();

    if (this.param.loadType === "general") {
      this.loadEvents();
      
      this.translateProvider.translateMessage("ConfirmEventSummary").then((res) => {
        this.description = `<span cssClass="description">${res}</span>`;
        this.btnCloseHide(!this.hide);
      });
    } else {
      this.getEvents(1);

      this.translateProvider.translateMessage("ConfirmEnrollment").then((res) => {
        this.description = `<span cssClass="description">${res}</span>`;
        this.btnCloseHide(!this.hide);
      });

      this.btnCloseHide(this.hide);
    }
  }

  bindSubTitle(event) {
    let start = moment(event.startTime).format("LT");
    let end = moment(event.endTime).format("LT");

    return (
      `<b>${start}</b> - <b>${end}</b>`          + 
      `<br>
        Session: <b> ${event.Class} </b>` +
      `<br>
        Seats Status: <b>${event.QtdyEnrolledUsers}/${event.Seats}</b>` +
      `<br>
        Instructor: <b>${event.Instructor}</b>`  +
      `<br>
        Location: <b>${event.Location.Location}</b>`      +
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

  loadEvents() {
    // this.agendaProvider.loadAllEvents("", "").subscribe(res => {
    //   this.loadingProvider.dismissLoading();
    //   this.bindElements(res);
    // });
    this.agendaProvider.loadAllEvents("1", "2").then(res => {
        this.loadingProvider.dismissLoading();
        this.bindElements(res);
      })
      .catch((err) => {   
          console.error(err);
      })
  }

  getEvents(trainingId) {
    // this.agendaProvider.getEvents(trainingId).subscribe(res => {
    //   this.loadingProvider.dismissLoading();
    //   this.bindElements(res);
    // });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  doConfirm(event) {
    let alert = this.alertCtrl.create({
      title: "" + event.title,
      subTitle: this.bindSubTitle(event),
      message: this.description,
      cssClass: 'description',
      buttons: [
        {
          text: "No",
          handler: () => {
            console.log("No");
          }
        },
        {
          text: "Yes",
          handler: () => {
            if (this.param.loadType === "general") {
              this.navController.push(EventSummaryComponent, {});
            } else {
              this.navController.push(CourseStepsComponent, {});
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
    console.log(
      "Selected time: " +
        ev.selectedTime +
        ", hasEvents: " +
        (ev.events !== undefined && ev.events.length !== 0) +
        ", disabled: " +
        ev.disabled
    );
  }

  onCloseModal() {
    this.navController.pop();
  }

  btnCloseHide(value) {
    this.hide = !value;
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  // createRandomEvents() {
  //   var events = [];
  //   for (var i = 0; i < 50; i += 1) {
  //     var date = new Date();
  //     var eventType = Math.floor(Math.random() * 2);
  //     var startDay = Math.floor(Math.random() * 90) - 45;
  //     var endDay = Math.floor(Math.random() * 2) + startDay;
  //     var startTime;
  //     var endTime;
  //     if (eventType === 0) {
  //       startTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + startDay
  //         )
  //       );
  //       if (endDay === startDay) {
  //         endDay += 1;
  //       }
  //       endTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + endDay
  //         )
  //       );
  //       events.push({
  //         title: "All Day -Teste" + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: true
  //       });
  //     } else {
  //       var startMinute = Math.floor(Math.random() * 24 * 60);
  //       var endMinute = Math.floor(Math.random() * 180) + startMinute;
  //       startTime = new Date(
  //         date.getFullYear(),
  //         date.getMonth(),
  //         date.getDate() + startDay,
  //         0,
  //         date.getMinutes() + startMinute
  //       );
  //       endTime = new Date(
  //         date.getFullYear(),
  //         date.getMonth(),
  //         date.getDate() + endDay,
  //         0,
  //         date.getMinutes() + endMinute
  //       );
  //       events.push({
  //         title: "Event - " + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: false
  //       });
  //     }
  //   }
  //   return events;
  // }

  onRangeChanged(ev) {
    console.log(
      "range changed: startTime: " + ev.startTime + ", endTime: " + ev.endTime
    );
  }

  // markDisabled = (date: Date) => {
  //   var current = new Date();
  //   current.setHours(0, 0, 0);
  //   return date < current;
  // };

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
