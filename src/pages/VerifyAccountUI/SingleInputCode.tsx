import { usePrevious } from 'hooks';
import React, { memo, useCallback, useEffect, useRef } from 'react';
import { objectKeys } from 'utils/object';
import { keyDownShouldBe } from 'utils/string';

interface SingleInputCodeProps extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
  isError?: boolean;
  onInputDown?: (evt: React.KeyboardEvent<HTMLInputElement>) => void;
  onInputChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

function SingleInput({
  focus,
  autoFocus = true,
  isError,
  type,
  disabled,
  onInputChange,
  onInputDown,
  ...rest
}: SingleInputCodeProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);

  const props = {
    disabled,
    ...rest,
  };

  if (disabled) {
    objectKeys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  useEffect(() => {
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

  const handleOnKeyDown = useCallback(
    (evt: React.KeyboardEvent<HTMLInputElement>) => {
      const keydown = evt.key;
      const isLatin = keyDownShouldBe(keydown, type || 'number');
      if (isLatin) {
        onInputDown && onInputDown(evt);
      }
    },
    [onInputDown, type]
  );

  const handleOnChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const value = evt.target.value;
      const isLatin = keyDownShouldBe(value, 'text');
      if (isLatin) {
        onInputChange && onInputChange(evt);
      }
    },
    [onInputChange]
  );

  return (
    <input
      {...props}
      ref={inputRef}
      disabled={disabled}
      onKeyDown={handleOnKeyDown}
      onChange={handleOnChange}
      className={`w-[100px] h-[120px] m-2 text-center border-2 rounded-md appearance-none
      text-7xl outline-none
      ${isError ? 'border-red-500' : 'border-blue-500'}
      ${disabled ? 'opacity-50 cursor-not-allowed border-blue-300' : ''}
      `}
    />
  );
}

const SingleInputCode = memo(SingleInput);
export default SingleInputCode;
