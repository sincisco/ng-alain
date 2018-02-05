import {OrgGrade} from "./orgGrade";

export class Session {

  constructor(public account?: string,
              public name?: string,
              public orgGrade?: OrgGrade,
              public orgName?: string,
              public orgNo?: string,
              public roleCatalog?: number,
              public view?: string) {
  }
}

export interface ISession{
    account: string;
    name: string;
    orgGrade?: OrgGrade;
    orgNo?: string;
    orgName?: string;
    roleCatalog?: number;
    view?: string;
}
