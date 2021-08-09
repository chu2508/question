import { JobWithSearchTerm } from "../../common/types";

export function dataTranslator(job: JobWithSearchTerm): JobWithSearchTerm {
  return {
    ...job,
    start: dateFormate(job.start),
    end: dateFormate(job.end),
  }
}

function dateFormate(date: string) {
  return new Date(date).toLocaleString()
}