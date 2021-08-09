import React, { useEffect, useMemo, useState } from "react";
import { IDataService } from "../common/types";
import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";
import { Swimlane } from "../components/swimlane/Swimlane";
import { resourceAllocationDataTranslator, swimLaneCardDataTranslator } from "./adapter/translator";
import { GetResourceAllocationDetails } from "./usecase/GetResourceAllocationDetails";

import "./QuestionTwo.css";
import { ResourceAllocationDetail, SwimLaneCard } from "./model";
import Loading from "../components/Loading";

/**
 * Please do not change these dates, the data on the server all fall within the 01/09/2018
 */
const RANGE_START = new Date("2018-09-01T00:00:00Z");
const RANGE_END = new Date("2018-09-02T24:00:00Z");

interface QuestionTwoBuilderProps {
  service: IDataService;
}

export function QuestionTwo({ service }: QuestionTwoBuilderProps) {
  const usecase = new GetResourceAllocationDetails(service, resourceAllocationDataTranslator);
  return <QuestionTwoWrapper usecase={usecase} />;
}

interface QuestionTwoProps {
  usecase: GetResourceAllocationDetails;
}

function QuestionTwoWrapper(props: QuestionTwoProps) {
  const [data, setData] = useState<ResourceAllocationDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const lanes: { title: string; cards: SwimLaneCard[] }[] = useMemo(
    () =>
      data.map((item) => {
        const cards: SwimLaneCard[] = [];
        item.jobs.forEach((job) => cards.push(swimLaneCardDataTranslator(job, "q2_card job_card")));
        item.activities.forEach((activity) => cards.push(swimLaneCardDataTranslator(activity, "q2_card activity_card")));
        return { title: item.resource.name, cards };
      }),
    [data]
  );

  useEffect(() => {
    setLoading(true);
    props.usecase
      .get()
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [props.usecase]);

  return (
    <SectionGroup>
      <SectionPanel>
        <Loading loading={loading}>
          <Swimlane lanes={lanes} start={RANGE_START} end={RANGE_END} />
        </Loading>
      </SectionPanel>
    </SectionGroup>
  );
}

export {};
