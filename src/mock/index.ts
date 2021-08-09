import { Activity, ActivityAllocations, Contact, IDataService, Job, JobAllocations, JobWithSearchTerm, Resource } from "../common/types";
import faker from "faker";

export function makeDataService(): IDataService {
  const mockService: jest.Mocked<IDataService> = {
    getJobs: jest.fn(),
    getJobsWithSearchTerm: jest.fn(),
    getActivities: jest.fn(),
    getJobAllocations: jest.fn(),
    getActivityAllocations: jest.fn(),
    getResources: jest.fn()
  };

  return mockService;
}

export function makeJob(): Job {
  return {
    id: faker.datatype.number(),
    contactId: faker.datatype.uuid(),
    start: faker.datatype.datetime().toUTCString(),
    end: faker.datatype.datetime().toUTCString(),
    location: faker.address.city(),
    name: faker.name.jobTitle()
  };
}
export function makeActivity(): Activity {
  return {
    id: faker.datatype.number(),
    name: faker.name.jobTitle(),
    start: faker.datatype.datetime().toUTCString(),
    end: faker.datatype.datetime().toUTCString()
  };
}

export function makeJobWithSearchTerm(): JobWithSearchTerm {
  const mockJob = makeJob();

  return {
    name: mockJob.name,
    start: mockJob.start,
    end: mockJob.end,
    contact: makeContact()
  };
}

export function makeContact(): Contact {
  return makeResource();
}

export function makeJobAllocations(resourceId?: number, jobId?: number): JobAllocations {
  return {
    resourceId: resourceId ?? faker.datatype.number(),
    jobId: jobId ?? faker.datatype.number(),
    id: faker.datatype.number()
  };
}

export function makeActivityAllocations(resourceId?: number, activityId?: number): ActivityAllocations {
  return {
    resourceId: resourceId ?? faker.datatype.number(),
    activityId: activityId ?? faker.datatype.number(),
    id: faker.datatype.number()
  };
}

export function makeResource(id?: number): Resource {
  return {
    id: id ?? faker.datatype.number(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}`
  };
}
