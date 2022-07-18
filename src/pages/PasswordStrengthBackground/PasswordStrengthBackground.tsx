import { useRef, useState } from 'react';

export default function PasswordStrengthBackground() {
  const [password, setPassword] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);
  const [blurValue, setBlurValue] = useState(20);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const blurValue = 20 - Number(value.length) * 2;

    setBlurValue(blurValue < 0 ? 0 : blurValue);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="absolute w-full h-full bg-center bg-no-repeat bg-cover rounded-lg top-16 -bottom-5 -right-5 -left-5 -z-10 bg-password "
        style={{
          filter: `blur(${blurValue}px)`,
        }}
      ></div>
      <div className="p-10 text-center bg-white rounded-md">
        <h1 className="text-3xl">Image Password Strength</h1>
        <p className="text-sm text-gray-700">Change the password to see the effect</p>
        <div className="my-4 text-left">
          <label htmlFor="email" className="text-gray-900">
            Email:
          </label>
          <input
            ref={emailRef}
            type="text"
            className="block w-full p-2 mt-2 border rounded"
            id="email"
            placeholder="Enter Email"
          />
        </div>

        <div className="my-4 text-left">
          <label htmlFor="email" className="text-gray-900">
            Password:
          </label>
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            className="block w-full p-2 mt-2 border rounded"
            id="password"
            placeholder="Enter Password"
          />
        </div>

        <button className="inline-block w-full py-2 mt-4 text-white bg-black rounded" type="submit">
          Submit
        </button>
      </div>
    </div>
  );
}
