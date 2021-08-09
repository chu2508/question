import { IDataService } from "../../common/types";
import { DataTranslatorParams, DataTranslatorType } from "../adapter/translator";
import { ResourceAllocationDetail } from "../model";



export class GetResourceAllocationDetails {
  constructor(private service: IDataService, private translator: DataTranslatorType) {}

  async get(): Promise<ResourceAllocationDetail[] >{
    const dataSource = await this._getDataSource()
    return this.translator(dataSource);
  }

  private async _getDataSource(): Promise<DataTranslatorParams> {
    let promises: Promise<any>[] = [];
    promises.push(this.service.getResources());
    promises.push(this.service.getJobAllocations());
    promises.push(this.service.getJobs());
    promises.push(this.service.getActivityAllocations());
    promises.push(this.service.getActivities());

    const [resources, jobAllocations, jobs, activityAllocations, activities] = await Promise.all(promises);

    return { resources, jobAllocations, jobs, activityAllocations, activities };
  }
}
