import React, { useState } from "react";

export const useInput = (
  initialValue: any
): { value: any; onChange: Function } => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { value, onChange };
};
