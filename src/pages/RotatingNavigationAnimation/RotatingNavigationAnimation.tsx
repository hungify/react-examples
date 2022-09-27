import { useState } from 'react';
import { GoThreeBars, GoX } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { AiTwotoneHome } from 'react-icons/ai';
import { RiUser5Fill } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';

export default function RotatingNavigationAnimation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='bg-[#333] text-[#222] overflow-x-hidden'>
      <div
        className={`w-screen min-h-screen ease-linear duration-500 p-13 bg-[#fafafa] origin-top-left p-14 ${
          isOpen ? '-rotate-[20deg]' : ''
        }`}
      >
        <div className='fixed -top-[100px] -left-[100px]'>
          <div
            className={`bg-[#ff7979] h-[200px] w-[200px] rounded-full relative ease-linear duration-500 ${
              isOpen ? '-rotate-[70deg]' : ''
            }`}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`absolute h-[100px] bg-transparent text-2xl border-none text-white px-2 py-1 origin-top-left rotate-90 top-[60%] left-[50%]`}
            >
              <GoX />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className='absolute h-[100px] bg-transparent text-2xl border-none text-white px-2 py-1 left-[60%] top-[50%]'
            >
              <GoThreeBars />
            </button>
          </div>
        </div>

        <div className='max-w-[1000px] mx-auto my-12'>
          <h1 className='font-semibold'>Amazing Article</h1>
          <small className='text-[#555] italic'>Florin Pop</small>
          <p className='text-[#333] my-4 leading-6'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            quia in ratione dolores cupiditate, maxime aliquid impedit dolorem
            nam dolor omnis atque fuga labore modi veritatis porro laborum
            minus, illo, maiores recusandae cumque ipsa quos. Tenetur,
            consequuntur mollitia labore pariatur sunt quia harum aut. Eum
            maxime dolorem provident natus veritatis molestiae cumque quod
            voluptates ab non, tempore cupiditate? Voluptatem, molestias culpa.
            Corrupti, laudantium iure aliquam rerum sint nam quas dolor
            dignissimos in error placeat quae temporibus minus optio eum soluta
            cupiditate! Cupiditate saepe voluptates laudantium. Ducimus
            consequuntur perferendis consequatur nobis exercitationem molestias
            fugiat commodi omnis. Asperiores quia tenetur nemo ipsa.
          </p>
          <h2 className='my-3 text-xl font-semibold'>My Dog</h2>
          <img
            src='https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2100&amp;q=80'
            alt='doggy'
            className='max-w-[1000px] mx-auto'
          />
          <p className='text-[#333] leading-6 my-4'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit libero
            deleniti rerum quo, incidunt vel consequatur culpa ullam. Magnam
            facere earum unde harum. Ea culpa veritatis magnam at aliquid.
            Perferendis totam placeat molestias illo laudantium? Minus id minima
            doloribus dolorum fugit deserunt qui vero voluptas, ut quia cum amet
            temporibus veniam ad ea ab perspiciatis, enim accusamus asperiores
            explicabo provident. Voluptates sint, neque fuga cum illum, tempore
            autem maxime similique laborum odio, magnam esse. Aperiam?
          </p>
        </div>
      </div>

      <nav className='fixed left-0 bottom-10'>
        <ul className='pl-8'>
          <li
            className={`text-white uppercase ease-in duration-300  ${
              isOpen ? 'translate-x-0 my-10 delay-300' : '-translate-x-[100%]'
            }`}
          >
            <Link to='/' className='flex items-center text-lg'>
              <AiTwotoneHome />
              <span className='ml-3'>Home</span>
            </Link>
          </li>
          <li
            className={`text-white uppercase ease-in duration-300 ml-[15px] ${
              isOpen ? 'translate-x-0 delay-300 my-10' : '-translate-x-[150%]'
            }`}
          >
            <Link to='/' className='flex items-center text-lg'>
              <RiUser5Fill />
              <span className='ml-3'>About</span>
            </Link>
          </li>
          <li
            className={`text-white uppercase ease-in duration-300 ml-[30px] ${
              isOpen ? 'translate-x-0 delay-300 my-10' : '-translate-x-[200%]'
            }`}
          >
            <Link to='/' className='flex items-center text-lg'>
              <HiOutlineMail />
              <span className='ml-3'>Contact</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
