import React, { Fragment, memo, useCallback, useEffect, useState } from 'react';
import SingleInputCode from './SingleInputCode';

interface OtpInputProps {
  numInputs: number;
  autoFocus?: boolean;
  isInputNumber?: boolean;
  isInputSecure?: boolean;
  disabled?: boolean;
  separator?: string;
  style?: React.CSSProperties;
  className?: string;
  inputClassName?: string;
  errorList?: number[];
  disabledList?: number[];
  onChangeOtp: (otp: string) => void;
  onFinish?: (otp: string) => void;
}

function OtpInputComponent({
  numInputs,
  isInputNumber,
  isInputSecure,
  autoFocus,
  disabled,
  onChangeOtp,
  inputClassName,
  separator,
  errorList,
  disabledList,
  onFinish,
  ...rest
}: OtpInputProps) {
  const [activeIdxInput, setActiveIdxInput] = useState(0);
  const [otpValues, setOtpValues] = useState(Array<string>(numInputs).fill(''));
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (finished) {
        onFinish && onFinish(otpValues.join(''));
        setFinished(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [finished, onFinish, otpValues]);

  const handleOtpChange = useCallback(
    (otp: string[]) => {
      const otpValue = otp.join('');
      onChangeOtp(otpValue);
      if (otpValue.length === numInputs) {
        setFinished(true);
      }
    },
    [numInputs, onChangeOtp]
  );

  // Helper to return value with the right type: 'text' or 'number'
  const getRightValue = useCallback(
    (str: string) => {
      let changedValue = str;
      if (!isInputNumber || !changedValue) {
        return changedValue;
      }
      return Number(changedValue) >= 0 ? changedValue : '';
    },
    [isInputNumber]
  );

  // Change OTP value at focussing input
  const changeValueAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeIdxInput] = str[0] || '';
      setOtpValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },

    [activeIdxInput, handleOtpChange, otpValues]
  );

  // Focus on input at index
  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(numInputs - 1, inputIndex), 0);
      setActiveIdxInput(selectedIndex);
    },
    [numInputs]
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeIdxInput - 1);
  }, [activeIdxInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeIdxInput + 1);
  }, [activeIdxInput, focusInput]);

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index: number) => {
      focusInput(index);
    },
    [focusInput]
  );

  // Handle onBlur input
  const onBlur = useCallback(() => {
    setActiveIdxInput(-1);
  }, []);

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = getRightValue(e.target.value);
      if (!value || value === '·') {
        e.preventDefault();
        return;
      }
      changeValueAtFocus(value);
      focusNextInput();
    },
    [changeValueAtFocus, focusNextInput, getRightValue]
  );

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const keydown = e.key;
      switch (keydown) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault();
          if (otpValues[activeIdxInput]) {
            changeValueAtFocus('');
          } else {
            focusPrevInput();
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          focusNextInput();
          break;
        }
        default: {
          if (keydown.match(/\d|\w/)) {
            return;
          }
          break;
        }
      }
    },
    [activeIdxInput, changeValueAtFocus, focusNextInput, focusPrevInput, otpValues]
  );

  return (
    <div {...rest} className="flex flex-wrap items-center justify-center w-full relative">
      {finished && (
        <div className="inline-flex items-center px-4 py-2 w-full h-full font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed absolute justify-center opacity-90">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Processing...</span>
        </div>
      )}
      {Array.from({ length: numInputs }).map((_, index) => (
        <Fragment key={index}>
          <SingleInputCode
            type={isInputSecure ? 'password' : isInputNumber ? 'number' : 'text'}
            focus={activeIdxInput === index}
            value={otpValues && otpValues[index]}
            autoFocus={autoFocus}
            onFocus={() => handleOnFocus(index)}
            onInputChange={!finished ? handleOnChange : undefined}
            onInputDown={!finished ? handleOnKeyDown : undefined}
            onBlur={onBlur}
            className={inputClassName}
            disabled={disabled || (disabledList && disabledList.includes(index))}
            isError={errorList && errorList.includes(index)}
          />
          {separator && index < numInputs - 1 && <span>{separator}</span>}
        </Fragment>
      ))}
    </div>
  );
}

const OtpInput = memo(OtpInputComponent);

export default OtpInput;
