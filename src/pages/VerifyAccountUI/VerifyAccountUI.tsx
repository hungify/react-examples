import { usePrevious } from 'hooks';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';

export default function VerifyAccountUI() {
  const [numInputs, setNumInputs] = useState(6);
  const [isInputNumber, setIsInputNumber] = useState(false);
  const [isInputSecure, setIsInputSecure] = useState(true);
  const [separator, setSeparator] = useState('-');

  return (
    <div className="flex items-center h-screen">
      <div className="w-[250px] relative shadow-lg h-full">
        <div className="flex justify-between p-4">
          <label htmlFor="">numInputs</label>
          <input
            className="w-2/4 border-2 rounded-lg outline-none"
            type="number"
            value={numInputs}
            min={4}
            max={7}
            onChange={(evt) => setNumInputs(Number(evt.target.value))}
          />
        </div>
        <div className="flex justify-between p-4">
          <label htmlFor="">separator</label>
          <input
            className="w-2/4 border-2 rounded-lg outline-none"
            type="text"
            value={separator}
            onChange={(evt) => setSeparator(evt.target.value)}
          />
        </div>
        <div className="flex justify-between p-4">
          <label htmlFor="">isInputNum</label>
          <input
            className="w-2/4"
            type="checkbox"
            checked={isInputNumber}
            onChange={(evt) => setIsInputNumber(evt.target.checked)}
          />
        </div>
        <div className="flex justify-between p-4">
          <label htmlFor="">isInputSecure</label>
          <input
            className="w-2/4"
            type="checkbox"
            checked={isInputSecure}
            onChange={(evt) => setIsInputSecure(evt.target.checked)}
          />
        </div>
      </div>

      <div className="border-4 border-black max-w-[1000px] rounded-2xl flex items-center justify-between flex-col p-7 text-center">
        <h1 className="font-medium">Verify Your Account</h1>
        <p className="w-[600px]">
          We emailed you the six digit code to cool_guy@email.com Enter the code below to confirm
          your email address.
        </p>
        <OTPInput
          isInputNumber={true}
          isInputSecure={false}
          numInputs={numInputs}
          separator={separator}
          onChangeOTP={(otp) => {}}
        />
        <small className="bg-[#eaeaea] p-[10px] text-[#777] max-w-[400px] rounded-md leading-5">
          This is design only. We didn't actually send you an email as we don't have your email,
          right?
        </small>
      </div>
    </div>
  );
}

interface OTPInputProps {
  numInputs: number;
  onChangeOTP: (otp: string) => any;

  autoFocus?: boolean;
  isInputNumber?: boolean;

  isInputSecure?: boolean;

  disabled?: boolean;

  separator?: string;

  style?: React.CSSProperties;
  className?: string;

  inputClassName?: string;
}

function OTPInput({
  numInputs,
  isInputNumber,
  isInputSecure,
  autoFocus,
  disabled,
  onChangeOTP,
  inputClassName,
  separator,
  ...rest
}: OTPInputProps) {
  const [activeIdxInput, setActiveIdxInput] = useState(0);
  const [otpValues, setOTPValues] = useState(Array<string>(numInputs).fill(''));

  const handleOtpChange = useCallback(
    (otp: string[]) => {
      const otpValue = otp.join('');
      onChangeOTP(otpValue);
    },
    [onChangeOTP]
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
  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeIdxInput] = str[0] || '';
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeIdxInput, handleOtpChange, otpValues]
  );

  // Focus `inputIndex` input
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
    (index: number) => () => {
      focusInput(index);
    },
    [focusInput]
  );

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue]
  );

  // Handle onBlur input
  const onBlur = useCallback(() => {
    setActiveIdxInput(-1);
  }, []);

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const pressedKey = e.key;
      switch (pressedKey) {
        case 'Backspace':
        case 'Delete': {
          e.preventDefault();
          if (otpValues[activeIdxInput]) {
            changeCodeAtFocus('');
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
          if (pressedKey.match(/^[^a-zA-Z0-9]$/)) {
            e.preventDefault();
          }
          break;
        }
      }
    },
    [activeIdxInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  );

  const handleOnPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData('text/plain')
        .replace(/\s/g, '')
        .slice(0, numInputs - activeIdxInput)
        .split('');

      if (pastedData) {
        let nextFocusIndex = 0;
        const updatedOTPValues = [...otpValues].filter((item) => item !== ' ');
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeIdxInput) {
            const changedValue = getRightValue(pastedData.shift() || val);
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updatedOTPValues);
        setActiveIdxInput(Math.min(nextFocusIndex + 1, numInputs - 1));
      }
    },
    [activeIdxInput, getRightValue, numInputs, otpValues]
  );

  return (
    <div {...rest} className="flex flex-wrap items-center justify-center w-full">
      {Array(numInputs)
        .fill('')
        .map((_, index) => (
          <>
            <InputCode
              key={index}
              type={isInputSecure ? 'password' : isInputNumber ? 'number' : 'text'}
              focus={activeIdxInput === index}
              value={otpValues && otpValues[index]}
              autoFocus={autoFocus}
              onFocus={handleOnFocus(index)}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              onBlur={onBlur}
              onPaste={handleOnPaste}
              className={inputClassName}
              disabled={disabled}
            />
            {separator && index < numInputs - 1 && <span>{separator}</span>}
          </>
        ))}
    </div>
  );
}

interface InputCodeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

function InputCode({ focus, autoFocus = true, ...rest }: InputCodeProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const prevFocus = usePrevious(!!focus);

  useLayoutEffect(() => {
    if (inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);

  return (
    <input
      ref={inputRef}
      {...rest}
      className="w-[100px] h-[120px] m-2 text-center border-2 border-blue-300 rounded-md appearance-none text-7xl"
    />
  );
}
