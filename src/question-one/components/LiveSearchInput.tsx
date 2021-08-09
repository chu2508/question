import React from "react";

export interface LiveSearchInputProps {
  onSearch?: (keyword: string) => void;
  onClear?: () => void;
}

function LiveSearchInput(props: LiveSearchInputProps) {
  return (
    <input
      placeholder='enter keyword to search'
      onInput={(event) => {
        const value = event.currentTarget.value.trim();
        const atLeast3 = value.length >= 3;
        const isCleared = value.length < 3;
        if (atLeast3) {
          props.onSearch?.(value);
        } else if (isCleared) {
          props.onClear?.();
        }
      }}
    />
  );
}

export default LiveSearchInput;
