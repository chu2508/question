import { Activity, Job, Resource } from "../../common/types";

export interface ResourceAllocationDetail {
  resource: Resource;
  jobs: Job[];
  activities: Activity[];
}

export interface SwimLaneCard {
  start: Date;
  end: Date;
  description: string;
  className?: string;
  style?: React.CSSProperties;
}
