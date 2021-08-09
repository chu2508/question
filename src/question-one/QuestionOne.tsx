import React, { useState } from "react";
import { IDataService, JobWithSearchTerm } from "../common/types";
import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";
import JobList from "./components/JobList";
import LiveSearchInput from "./components/LiveSearchInput";
import Loading from "../components/Loading";
import useDebounce from "./hooks/useDebounce";
import "./QuestionOne.css";

export interface QuestionOneProps {
  service: IDataService;
}

export const QuestionOne = ({ service }: QuestionOneProps) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<JobWithSearchTerm[] | null>(null);

  const onSearch = useDebounce((keyword: string) => {
    setLoading(true);
    service
      .getJobsWithSearchTerm(keyword)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 300);

  const onClear = () => {
    setData(null);
  };

  const content = data ? <JobList dataSource={data} /> : null;

  return (
    <SectionGroup>
      <SectionPanel>
        <p>Enter keyword to search</p>
        <LiveSearchInput onClear={onClear} onSearch={onSearch} />
        <Loading loading={loading}>{content}</Loading>
      </SectionPanel>
    </SectionGroup>
  );
};
