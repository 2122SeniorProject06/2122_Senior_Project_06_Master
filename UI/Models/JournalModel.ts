import { ActivityMetric } from "./MetricsModel";

//model for Journal feature
export class JournalModel {
  public journalID?: string;
  public title?: string;
  public body?: string;
  public userID?: string;
  public lastUpdated?: Date;
  public ActivityMetric?: ActivityMetric;
  }
