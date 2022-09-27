import { projects } from '~/mocks';
import { useEffect, useState } from 'react';
import {
  HiOutlineArrowSmLeft,
  HiOutlineArrowSmRight,
  HiOutlineHome,
} from 'react-icons/hi';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { capitalize } from '~/utils';

interface NavigationProps {
  children?: React.ReactNode;
}
export default function Navigation({ children }: NavigationProps) {
  const [title, setTitle] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    const pathnameArr = pathname.split('/');
    const title = pathnameArr[pathnameArr.length - 1]!.replaceAll('-', ' ');
    document.title = capitalize(title);
    setTitle(capitalize(title));
  }, [pathname]);

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoNext = () => {
    let count = 1;
    const current = projects.findIndex((project) => project.title === title);
    while (projects[current + count]!.locked) {
      count++;
    }
    if (current < projects.length) {
      navigate(
        `/projects/${projects[current + count]!.title.toLowerCase().replaceAll(
          ' ',
          '-',
        )}`,
      );
    }
  };

  const handleGoPrevious = () => {
    let count = 1;
    const current = projects.findIndex((project) => project.title === title);
    while (projects[current - count]!.locked) {
      count++;
    }
    if (current < projects.length) {
      navigate(
        `/projects/${projects[current - count]!.title.toLowerCase().replaceAll(
          ' ',
          '-',
        )}`,
      );
    }
  };

  return (
    <>
      <div className='flex justify-between p-3 shadow-neutral-800 '>
        <button
          className=' bg-[#e1e7ff] rounded-md p-2 inline-flex items-center justify-center  hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-[#554ca6]'
          onClick={handleGoHome}
        >
          <HiOutlineHome className='w-5 h-5' />
        </button>
        <div className='flex items-center font-medium'>
          <span>{title}</span>
        </div>
        <button
          className=' bg-[#e1e7ff] rounded-md p-2 inline-flex items-center justify-center  hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-[#554ca6] '
          onClick={handleGoPrevious}
          disabled={title === projects[0]!.title}
        >
          <HiOutlineArrowSmLeft className='w-5 h-5' />
          <span className='font-semibold'>Previous</span>
        </button>

        <button
          className='bg-[#e1e7ff] rounded-md p-2 inline-flex items-center justify-center  hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-[#554ca6]'
          onClick={handleGoNext}
          // disabled={title === projects[projects.length - 1]}
          disabled={title === 'Live User Filter'}
        >
          <HiOutlineArrowSmRight className='w-5 h-5' />
          <span className='font-semibold'>Next</span>
        </button>
      </div>
      <Outlet />
      {children}
    </>
  );
}
