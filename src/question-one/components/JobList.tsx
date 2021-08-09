import React, { useMemo } from "react";
import { JobWithSearchTerm } from "../../common/types";
import { dataTranslator } from "../adapter/translator";
import JobItem from "./JobItem";
import NoData from "../../components/NoData";

export interface JobListProps {
  dataSource: JobWithSearchTerm[];
}

function JobList(props: JobListProps) {
  const { dataSource } = props;
  const data = useMemo(() => {
    return dataSource.map((item) => dataTranslator(item));
  }, [dataSource]);

  return data.length > 0 ? (
    <div className='job-content'>
      <div className='item-content'>
        <div className='item-contact-id'>#</div>
        <div className='item-name'>Name</div>
        <div className='item-start'>Start Date</div>
        <div className='item-end'>End Date</div>
        <div className='item-contact-name'>Contact</div>
      </div>
      {data.map((item, ind) => {
        return <JobItem key={ind} item={item}></JobItem>;
      })}
    </div>
  ) : (
    <NoData data-testid='noData' message='No jobs found' />
  );
}

export default JobList;
