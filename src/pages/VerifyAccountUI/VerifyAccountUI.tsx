import React, { useRef, useState } from 'react';

export default function VerifyAccountUI() {
  const [codes, setCodes] = useState<number[]>(Array(6).fill(0));
  const inputRef = useRef<HTMLUListElement>(null);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const value = e.target.value;
    // if (value && value.length <= 6) {
    //   const codesArr = value.split('');
    //   const newCode = codesArr.map((code) => parseInt(code));
    //   console.log(newCode);
    //   // setCodes([]);
    // }
    // const input = inputRef.current;
    // if (input) {
    //   input.childNodes.forEach((node) => {
    //     console.log(node);
    //   });
    // }
    
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border-4 border-black max-w-[900px] rounded-2xl h-[400px] flex items-center justify-between flex-col p-7 text-center">
        <h1 className="font-medium">Verify Your Account</h1>
        <p className="w-[600px]">
          We emailed you the six digit code to cool_guy@email.com Enter the code below to confirm
          your email address.
        </p>
        <ul className="flex justify-between w-full gap-5" ref={inputRef}>
          {codes.map((code, i) => (
            <input
              key={i}
              className="text-7xl border-2 border-blue-300 rounded-md w-[100px] h-[120px] p-5 text-center appearance-none"
              type="number"
              onKeyDown={handleCodeChange}
              min="0"
              max="9"
              tabIndex={i}
              required
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
