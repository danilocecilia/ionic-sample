import { Section } from "./section";
import { observable } from "mobx-angular";

export class JobRole{
    ID: number;
    @observable JobRole: string;
    @observable Section: Section
}