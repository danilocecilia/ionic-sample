import { NavController, Platform } from "ionic-angular/index";
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild
} from "@angular/core";
import * as moment from "moment";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { AgendaProvider } from "../../providers/agenda/agenda";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { CourseStepsComponent } from "../course-steps/course-steps";
/**
 * Generated class for the AgendaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "agenda",
  templateUrl: "agenda.html"
})
export class AgendaComponent implements OnInit {
  events: any;
  eventSource;
  viewTitle;
  isToday: boolean;
  param: any;
  subtitle: string;
  description: string;
  hide: boolean = false;
  @ViewChild("btnClose") btnClose: any;

  calendar = {
    mode: "month",
    locale: "en-US",
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

  ngOnInit() {
    if (this.param.loadType === "general") {
      this.loadEvents();
      this.description =
        "Confirm to see the Event Summary for this date and class?";
      this.btnCloseHide(!this.hide);
    } else {
      this.getEvents(1);
      this.description = "Do you confirm your enrollment for this date event?";
      this.btnCloseHide(this.hide);
    }
  }

  constructor(
    private navController: NavController,
    private alertCtrl: AlertController,
    private agendaProvider: AgendaProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.param = this.navParams.data;
  }

  bindSubTitle(event) {
    let start = moment(event.startTime).format("LT");
    let end = moment(event.endTime).format("LT");

    return (
      start +
      ` - ` +
      end +
      `<br>` +
      `
            Session: ` +
      event.TrainingCode +
      `<br> 
            Seats Status: ` +
      event.SeatStatus +
      `<br>
            Instructor: ` +
      event.Instructor +
      `<br>
            Location: ` +
      event.Location +
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
    this.agendaProvider.loadAllEvents("", "").subscribe(res => {
      this.bindElements(res);
    });
  }

  getEvents(trainingId) {
    this.agendaProvider.getEvents(trainingId).subscribe(res => {
      this.bindElements(res);
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  doConfirm(event) {
    let alert = this.alertCtrl.create({
      title: "" + event.title,
      subTitle: this.bindSubTitle(event),
      message: this.description,
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
            //TODO: 
            if (this.param.loadType === "general") {
              
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
    // var today = new Date();
    // today.setHours(0, 0, 0, 0);
    // event.setHours(0, 0, 0, 0);
    // this.isToday = today.getTime() === event.getTime();
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
