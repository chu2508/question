import { makeActivity, makeActivityAllocations, makeJob, makeJobAllocations, makeResource } from "../../mock";
import { ResourceAllocationDetail, SwimLaneCard } from "../model";
import { resourceAllocationDataTranslator, DataTranslatorParams, swimLaneCardDataTranslator } from "./translator";

const makeRawData = () => {
  const res1 = makeResource(1);
  const res2 = makeResource(2);
  const job1 = makeJob();
  const job2 = makeJob();
  const job3 = makeJob();
  const ac1 = makeActivity();
  const ac2 = makeActivity();
  const ac3 = makeActivity();
  const ja1 = makeJobAllocations(res1.id, job1.id);
  const ja2 = makeJobAllocations(res1.id, job2.id);
  const ja3 = makeJobAllocations(res2.id, job3.id);
  const ja4 = makeJobAllocations(res2.id, job1.id);
  const aa1 = makeActivityAllocations(res1.id, ac1.id);
  const aa2 = makeActivityAllocations(res2.id, ac2.id);
  const aa3 = makeActivityAllocations(res2.id, ac3.id);
  const mockData: DataTranslatorParams = {
    resources: [res1, res2],
    jobs: [job1, job2, job3],
    activities: [ac1, ac2, ac3],
    jobAllocations: [ja1, ja2, ja3, ja4],
    activityAllocations: [aa1, aa2, aa3]
  };
  const tResult: ResourceAllocationDetail[] = [
    { resource: res1, jobs: [job1, job2], activities: [ac1] },
    { resource: res2, jobs: [job3, job1], activities: [ac2, ac3] }
  ];

  return { mockData, tResult };
};

describe("resourceAllocationDataTranslator", () => {
  test("should return correct result", () => {
    const { mockData, tResult } = makeRawData();

    const result = resourceAllocationDataTranslator(mockData);

    expect(result).toEqual(tResult);
  });
});

describe("swimLaneDataTranslator", () => {
  test("should return correct result", () => {
    const mockData1 = makeJob();
    const mockData2 = makeActivity();
    const className = "test_class";
    const style = { color: "#fff" };

    const tResult1: SwimLaneCard = {
      start: new Date(mockData1.start),
      end: new Date(mockData1.end),
      description: mockData1.name,
      className,
      style
    };

    const tResult2: SwimLaneCard = {
      start: new Date(mockData2.start),
      end: new Date(mockData2.end),
      description: mockData2.name,
      className,
      style
    };

    const result1 = swimLaneCardDataTranslator(mockData1, className, style);
    const result2 = swimLaneCardDataTranslator(mockData2, className, style);

    expect(result1).toEqual(tResult1);
    expect(result2).toEqual(tResult2);
  });
});
