import { render, fireEvent } from "@testing-library/react";
import LiveSearchInput from "./LiveSearchInput";
import React from "react";

const setUp = () => {
  const mockOnSearch = jest.fn();
  const mockOnClear = jest.fn();
  const result = render(<LiveSearchInput onSearch={mockOnSearch} onClear={mockOnClear} />);
  const input = result.getByPlaceholderText("enter keyword to search");

  return {
    input,
    result,
    mockOnSearch,
    mockOnClear
  };
};

describe("LiveSearchInput", () => {
  test("should correct init render component", () => {
    const { input } = setUp();

    expect(input).not.toBeNull();
  });

  test('should call "onSearch" with correct value if enter keyword length >= 3', () => {
    const mockKeyword = "any_keyword";
    const { mockOnSearch, input } = setUp();

    fireEvent.input(input, { target: { value: mockKeyword } });

    expect(mockOnSearch).toBeCalledWith(mockKeyword);
  });

  test('should not be called "onSearch" if enter keyword length < 3', () => {
    const { input, mockOnSearch } = setUp();
    const mockKeyword = "ke";

    fireEvent.input(input, { target: { value: mockKeyword } });

    expect(mockOnSearch).not.toBeCalled();
  });

  test('should call "onClear" if enter keyword length < 3', () => {
    const { input, mockOnClear } = setUp();
    const mockKeyword = "ke";

    fireEvent.input(input, { target: { value: mockKeyword } });

    expect(mockOnClear).toBeCalledTimes(1);
  });
});
