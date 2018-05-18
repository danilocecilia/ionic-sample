import { JobRole } from "./jobrole";
import { observable } from "mobx-angular";
import { User } from "./user";
import { Level } from "./level";

export class Competency {
  ID: number | string;
  @observable JobRole: JobRole;
  //    @observable User: User;
  @observable CurrentLevel: Level;
  @observable Competency: ItemCompetency;
  @observable JobRoleOrdinal: number;
  @observable QtyPass: number;
  @observable QtyPending: number;
  @observable Percentage: number;
}

export class ItemCompetency {
  @observable Level: LevelCompetency;
  @observable APIHistoryCompetency: HistoryCompetency[];
  @observable QtyPass: number;
  @observable QtyPending: number;
  @observable Percentage: number;
}

export class LevelCompetency {
  ID: number;
  @observable Level: string;
  @observable HexColor: string;
}

export class HistoryCompetency {
  ID: number;
  @observable TrainingCompetency: TrainingCompetency;
  @observable APIClassCompetency: ClassCompetency;
  @observable PreTest: number;
  @observable PostTest: number;
  @observable Percentage: number;
  @observable DateTime: string;
  @observable Status: string;
}

export class TrainingCompetency {
  ID: number;
  @observable Training: string;
  @observable Category: string;
  @observable Summary: string;
  @observable Thumbnail: string;
  @observable Cost: number;
  @observable MonetarySymbol: string;
  @observable CompletionExpirationDays: number;
}

export class ClassCompetency {
  ID: number;
  @observable Code: string;
}
