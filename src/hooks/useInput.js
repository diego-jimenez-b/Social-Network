import { useState } from 'react';

const useInput = (validate) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [wasTouched, setWasTouched] = useState(false);

  const valueIsValid = validate(enteredValue);
  const hasError = wasTouched && !valueIsValid;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputBlurHandler = () => {
    setWasTouched(true);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useInput;
