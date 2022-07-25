import OtpInput from 'pages/VerifyAccountUI/OtpInput';
import { useEffect, useState } from 'react';

export default function VerifyAccountUI() {
  const [numInputs, setNumInputs] = useState(5);
  const [isInputNumber, setIsInputNumber] = useState(false);
  const [isInputSecure, setIsInputSecure] = useState(false);
  const [separator, setSeparator] = useState('-');
  const [errorList, setErrorList] = useState<number[]>([]);
  const [disabledList, setDisabledList] = useState<number[]>([]);
  const [errorListSize, setErrorListSize] = useState(0);
  const [disabledListSize, setDisabledListSize] = useState(0);

  useEffect(() => {
    if (errorListSize > 0) {
      const arrError = Array(errorListSize)
        .fill(0)
        .reduce((prev, cur, index) => {
          return [...prev, index];
        }, []);
      setErrorList(arrError);
    } else {
      setErrorList([]);
    }
    if (disabledListSize > 0) {
      const arrDisabled = Array(disabledListSize)
        .fill(0)
        .reduce((prev, cur, index) => {
          return [...prev, index];
        }, []);
      setDisabledList(arrDisabled);
    } else {
      setDisabledList([]);
    }
  }, [errorListSize, disabledListSize]);

  return (
    <div className="App">
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
            <label htmlFor="">Size of error list</label>
            <input
              className="w-2/4 border-2 rounded-lg outline-none"
              type="number"
              value={errorListSize}
              min={0}
              max={numInputs}
              onChange={(evt) => setErrorListSize(Number(evt.target.value))}
            />
          </div>
          <div className="flex justify-between p-4">
            <label htmlFor="">Size of disabled list</label>
            <input
              className="w-2/4 border-2 rounded-lg outline-none"
              type="number"
              value={disabledListSize}
              min={0}
              max={numInputs}
              onChange={(evt) => setDisabledListSize(Number(evt.target.value))}
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

        <div
          className="border-4 border-black max-w-[1000px] rounded-2xl flex items-center justify-between
        flex-col p-7 text-center"
        >
          <h1 className="font-medium">Verify Your Account</h1>
          <p className="w-[600px]">
            We emailed you the six digit code to cool_guy@email.com Enter the code below to confirm
            your email address.
          </p>
          <OtpInput
            isInputNumber={isInputNumber}
            isInputSecure={isInputSecure}
            numInputs={numInputs}
            disabledList={disabledList}
            errorList={errorList}
            separator={separator}
            onChangeOtp={(otp) => {}}
            // onFinish={(otpValue: string) => {
            //   alert(`OTP value is ${otpValue}`);
            // }}
          />
        </div>
      </div>
    </div>
  );
}
