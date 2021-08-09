import React, { useEffect, useState } from "react";

import { SectionGroup } from "../components/section/SectionGroup";
import { SectionPanel } from "../components/section/SectionPanel";

import Sidemenu from "../components/layout/sidemenu/Sidemenu";

import "./QuestionThree.css";
import Head from "../components/layout/head/Head";
import Board from "../components/layout/board/Board";
import { IDataService } from "../common/types";

export const QuestionThree = ({ service }: { service: IDataService }) => {
  const [jobs, setJobs] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    let promises: Promise<any>[] = [];
    promises.push(service.getJobAllocations());
    promises.push(service.getJobs());

    Promise.all(promises)
      .then((res) => {
        const [jobAllocations, jobs] = res;
        jobs.forEach((job: any) => {
          job.allocations = 0;
          for (let i of jobAllocations) {
            if (i.jobId === job.id) {
              job.allocations = ++job.allocations;
            }
          }
        });
        setJobs(jobs);
      })
      .finally(() => setLoad(false));
  }, [service]);

  return (
    <SectionGroup>
      <SectionPanel>
        <div className='q3-content'>
          <Sidemenu />
          <div className='q3-main'>
            <Head />
            {load ? <p>loading...</p> : <Board jobs={jobs} />}
          </div>
        </div>
      </SectionPanel>
    </SectionGroup>
  );
};
