export class ResolvedAssessment {
  constructor() {
    
  }
  ID_Assessment: number;
  ID_Class: number;
  ID_Training: number;
  Questions: ResolvedQuestion[];
}

export class ResolvedQuestion {
  ID_Question: number;
  ID_Alternative: number;
}
