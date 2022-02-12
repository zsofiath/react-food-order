import { useState } from "react";

const useValiation = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const enteredValueIsValid = validateValue(enteredValue);
  const hasError = !enteredValueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched(false);
    setEnteredValue('');
  }

  return {
    value: enteredValue,
    isValid: enteredValueIsValid,
    hasError,
    reset,
    valueChangeHandler,
    valueBlurHandler,
  };
};

export default useValiation;