import { JobRole } from "./jobrole";

export interface Competency {
    ID: number | string;
    JobRole: JobRole;
    JobRoleOrdinal: number;
}