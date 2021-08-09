import { render } from "@testing-library/react";
import React from "react";
import { makeJobWithSearchTerm } from "../../mock";
import JobItem from "./JobItem";

describe("JobItem", () => {
  test("should correct render data", () => {
    const mockJob = makeJobWithSearchTerm()

    const result = render(<JobItem item={mockJob} />);

    expect(result.getByText(mockJob.name).textContent).toMatch(mockJob.name)
    expect(result.getByText(mockJob.start).textContent).toMatch(mockJob.start)
    expect(result.getByText(mockJob.end).textContent).toMatch(mockJob.end)
    expect(result.getByText(mockJob.contact.name).textContent).toMatch(mockJob.contact.name)
  });
});
