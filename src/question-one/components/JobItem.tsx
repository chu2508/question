import React from "react";
import { Job, JobWithSearchTerm } from "../../common/types";

export interface JobItemProps {
  item: JobWithSearchTerm;
}

function JobItem(props: JobItemProps) {
  const { item } = props;
  return (
    <div className='item-content' data-testid="item">
      <div className='item-contact-id'>{item.contact.id}</div>
      <div className='item-name'>{item.name}</div>
      <div className='item-start'>{item.start}</div>
      <div className='item-end'>{item.end}</div>
      <div className='item-contact-name'>{item.contact.name}</div>
    </div>
  );
}

export default JobItem;
