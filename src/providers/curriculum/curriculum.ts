import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CurriculumProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CurriculumProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CurriculumProvider Provider');
  }

  getCurriculum(token, idJobRole) {
    return {
      "ID": 44,
      "JobRole": {
        "ID": 1,
        "JobRole": "INTERNAL",
        "Section": {
          "ID": 1,
          "Section": "VENDAS"
        }
      },
      "JobRoleOrdinal": 1,
      "CurrentLevel": null,
      "Competency":
        [{
          "Level": {
            "ID": 2,
            "Level": "BRONZE",
            "HexColor": "#"
          },
          "History":
            [{
              "ID": 22,
              "Training": {
                "ID": 1,
                "Training": "FACE TO FACE TRAINING 1",
                "Category": "FACE_TO_FACE",
                "Summary": "OBJECTIVES Understand the concept and positioning of the Triumph Tiger 800 Understand the key selling points and what makes the Tiger 800 BETTER IN EVERY WAY OFF ROAD, AND ON : capability, technology, engine and chassis upgrades, styling, specifications & equipment, together with competitor analysis. Understand the key accessories and clothing ranges available.", "Thumbnail": ""
              }, "Class": { "ID": 5, "Code": "FF0001_CL0003" }, "PreTest": 0.0, "PostTest": 0.0, "Percentage": 0.0, "Date": "2018-01-29T14:09:39", "Status": "ENROLLED"
            }, { "ID": 1, "Training": { "ID": 3, "Training": "FILE TRAINING 1", "Category": "ELECTRONIC", "Summary": "OBJECTIVES Understand the concept and positioning of the Triumph Tiger 1200 Understand the key selling points and what makes the Tiger 1200 special: specifications & equipment, styling, together with competitor analysis Understand the key accessories available", "Thumbnail": "" }, "Class": { "ID": 4, "Code": "EL0003_CL0001" }, "PreTest": 0.0, "PostTest": 0.0, "Percentage": 100.0, "Date": "2018-01-02T17:01:55", "Status": "PASS" }, {
              "ID": 0, "Training": {
                "ID": 4, "Training": "VIRTUAL CLASSROOM TRAINING 1", "Category": "VCT", "Summary": "OBJECTIVES Understand the concept and positioning of the Bonneville Bobber Black. Understand the key selling points and what makes the Bobber Black special: styling, specifications & equipment. Understand the key accessories available.",
                "Thumbnail": ""
              },
              "Class": null,
              "PreTest": 0.0,
              "PostTest": 0.0,
              "Percentage": 0.0,
              "Date": "0001-01-01T00:00:00",
              "Status": "NOT_STARTED"
            }, {
              "ID": 2,
              "Training": {
                "ID": 2,
                "Training": "WEB-BASED TRAINING 1",
                "Category": "WEB_BASED",
                "Summary": "This module is designed to help you learn about the Bonneville Bobber",
                "Thumbnail": ""
              },
              "Class": {
                "ID": 2,
                "Code": "WB0002_CL0001"
              },
              "PreTest": 0.0,
              "PostTest": 0.0,
              "Percentage": 100.0,
              "Date": "2018-01-02T17:02:07", "Status": "PASS"
            }],
          "QtyPass": 2,
          "QtyPending": 2,
          "Percentage": 50.0
        },
        {
          "Level": {
            "ID": 3,
            "Level": "PRATA",
            "HexColor": "#"
          },
          "History":
            [{
              "ID": 22,
              "Training": {
                "ID": 1,
                "Training": "FACE TO FACE TRAINING 1",
                "Category": "FACE_TO_FACE",
                "Summary": "OBJECTIVES Understand the concept and positioning of the Triumph Tiger 800 Understand the key selling points and what makes the Tiger 800 BETTER IN EVERY WAY OFF ROAD, AND ON : capability, technology, engine and chassis upgrades, styling, specifications & equipment, together with competitor analysis. Understand the key accessories and clothing ranges available.", "Thumbnail": ""
              }, "Class": { "ID": 5, "Code": "FF0001_CL0003" }, "PreTest": 0.0, "PostTest": 0.0, "Percentage": 0.0, "Date": "2018-01-29T14:09:39", "Status": "ENROLLED"
            }, { "ID": 1, "Training": { "ID": 3, "Training": "FILE TRAINING 1", "Category": "ELECTRONIC", "Summary": "OBJECTIVES Understand the concept and positioning of the Triumph Tiger 1200 Understand the key selling points and what makes the Tiger 1200 special: specifications & equipment, styling, together with competitor analysis Understand the key accessories available", "Thumbnail": "" }, "Class": { "ID": 4, "Code": "EL0003_CL0001" }, "PreTest": 0.0, "PostTest": 0.0, "Percentage": 100.0, "Date": "2018-01-02T17:01:55", "Status": "PASS" }, {
              "ID": 0, "Training": {
                "ID": 4, "Training": "VIRTUAL CLASSROOM TRAINING 1", "Category": "VCT", "Summary": "OBJECTIVES Understand the concept and positioning of the Bonneville Bobber Black. Understand the key selling points and what makes the Bobber Black special: styling, specifications & equipment. Understand the key accessories available.",
                "Thumbnail": ""
              },
              "Class": null,
              "PreTest": 0.0,
              "PostTest": 0.0,
              "Percentage": 0.0,
              "Date": "0001-01-01T00:00:00",
              "Status": "NOT_STARTED"
            }, {
              "ID": 2,
              "Training": {
                "ID": 2,
                "Training": "WEB-BASED TRAINING 1",
                "Category": "WEB_BASED",
                "Summary": "This module is designed to help you learn about the Bonneville Bobber",
                "Thumbnail": ""
              },
              "Class": {
                "ID": 2,
                "Code": "WB0002_CL0001"
              },
              "PreTest": 0.0,
              "PostTest": 0.0,
              "Percentage": 100.0,
              "Date": "2018-01-02T17:02:07", "Status": "PASS"
            }],
          "QtyPass": 2,
          "QtyPending": 2,
          "Percentage": 50.0
        }],
        
      "QtyPass": 2,
      "QtyPending": 2,
      "Percentage": 50.0,
      "ApiStatus": 0
    }
  }

}
