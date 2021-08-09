import { Activity, ActivityAllocations, Job, JobAllocations, Resource } from "../../common/types";
import { ResourceAllocationDetail } from "../model";

export interface DataTranslatorParams {
  resources: Resource[];
  jobAllocations: JobAllocations[];
  jobs: Job[];
  activityAllocations: ActivityAllocations[];
  activities: Activity[];
}

export function resourceAllocationDataTranslator(params: DataTranslatorParams): ResourceAllocationDetail[] {
  const resourceMap = getResourceMap(params);
  fillRelation(resourceMap, params);
  return Object.values(resourceMap);
}

type ResourceMapType = {
  [key: number]: ResourceAllocationDetail;
};

function getResourceMap(params: DataTranslatorParams): ResourceMapType {
  const result: ResourceMapType = {};

  params.resources.forEach((resource) => {
    result[resource.id] = {
      resource,
      jobs: [],
      activities: []
    };
  });

  return result;
}

function fillRelation(map: ResourceMapType, params: DataTranslatorParams) {
  params.jobAllocations.forEach((item) => {
    const detail = map[item.resourceId];
    if (detail) {
      const job = params.jobs.find((job) => job.id === item.jobId);
      if (job) {
        detail.jobs.push(job);
      }
    }
  });
  params.activityAllocations.forEach((item) => {
    const detail = map[item.resourceId];
    if (detail) {
      const activity = params.activities.find((activity) => activity.id === item.activityId);
      if (activity) {
        detail.activities.push(activity);
      }
    }
  });
}

export type DataTranslatorType = typeof resourceAllocationDataTranslator;

export function swimLaneCardDataTranslator(raw: Job | Activity, className?: string, style?: React.CSSProperties) {
  return {
    start: new Date(raw.start),
    end: new Date(raw.end),
    description: raw.name,
    className,
    style
  };
}
