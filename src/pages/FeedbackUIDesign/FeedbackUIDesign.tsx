import { feedback } from '~/mocks';
import { useState } from 'react';
import { IoIosHeart } from 'react-icons/io';

export default function FeedbackUIDesign() {
  const [activeIdx, setActiveIdx] = useState(1);
  const [sendFinished, setSendFinished] = useState(false);

  const handleSendReview = () => {
    setSendFinished(true);
  };

  return (
    <div className='h-screen flex justify-center items-center bg-[#fef9f2]'>
      <div
        className={`flex flex-col items-center justify-center p-8 text-center shadow-2xl ${
          sendFinished ? 'max-w-[400px]' : 'max-w-[800px]'
        }`}
      >
        {sendFinished ? (
          <>
            <IoIosHeart className='text-lg text-red-600 w-[30px] h-[30px] mb-2' />
            <strong>Thank you</strong>
            <br />
            <strong>Feedback: Satisfied</strong>
            <p className='py-3'>
              We&apos;ll use your feedback to improve our customer support
            </p>
          </>
        ) : (
          <>
            <h2>
              How satisfied are you with our customer support performance?
            </h2>
            <ul className='flex py-5 my-5'>
              {feedback.map(({ icon, id, title }) => (
                <li
                  key={id}
                  className={`p-8 flex flex-col items-center cursor-pointer h-[100px] w-[100px] ${
                    activeIdx === id ? 'shadow-2xl' : 'shadow-none'
                  }`}
                  onClick={() => setActiveIdx(id)}
                  onKeyDown={() => setActiveIdx(id)}
                  role='presentation'
                >
                  <img
                    src={icon}
                    alt={title}
                    className='object-cover w-full h-full'
                  />
                  <span
                    className={`mt-2 inline-block ${
                      activeIdx === id ? 'text-[#111] ' : 'text-[#555]'
                    }`}
                  >
                    {title}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className='bg-[#302d2b] rounded px-6 py-3 text-white'
              onClick={handleSendReview}
            >
              Send Review
            </button>
          </>
        )}
      </div>
    </div>
  );
}
