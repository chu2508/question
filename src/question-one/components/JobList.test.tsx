import { makeJobWithSearchTerm } from "../../mock";
import JobList from "./JobList";
import React from 'react'
import { render } from "@testing-library/react";
import * as translator from '../adapter/translator'

describe("JobList", () => {
  test('should call "dataTranslator"', () => {
    const spy = jest.spyOn(translator, 'dataTranslator')
    const mockData = Array.from({ length: 5 }).map(() => makeJobWithSearchTerm());
    render(<JobList dataSource={mockData} />);

    expect(spy).toBeCalled()
    expect(spy).toBeCalledTimes(mockData.length)
  });

  test('should correct render JobItem', () => {
    const mockData = Array.from({ length: 10 }).map(() => makeJobWithSearchTerm());

    const result = render(<JobList dataSource={mockData} />);

    expect(result.getAllByTestId('item')).toHaveLength(mockData.length)
  });
});
