import { observable } from "mobx-angular";
import { Location } from "../model/location";

export class Class {
  ID: number
  @observable ClassCode: string;
  //@observable //Training : APITraining;
  @observable title: string;
  @observable startTime: Date;
  @observable endTime: Date;
  @observable StartEnrollment: Date;
  @observable EndEnrollment: Date;
  @observable Status: number;
  @observable Seats: number;
  @observable SeatsByOrganization: number;
  @observable APILocation: Location;
  @observable Instructor: string;
  @observable QtdyEnrolledUsers: number;
  @observable EnrollmentType: string;
  @observable Step: number;
  @observable QtyBilling: string;
  @observable QtyLogistic: string;
  @observable AverageScore: string;
  @observable Monetary: string;
  @observable CostType: string;
}
