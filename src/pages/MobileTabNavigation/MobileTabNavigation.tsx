import { navMobile } from 'mocks';
import { useState } from 'react';

export default function MobileTabNavigation() {
  const [active, setActive] = useState('home');

  const handleChangeActive = (id: string) => () => {
    setActive(id);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#9b59b6]">
      <div className="h-[600px] w-[340px] border-4 border-gray-100 rounded-3xl relative overflow-hidden ease-in duration-100 ">
        <img
          src={navMobile.find((item) => item.id === active)?.img}
          alt={active}
          className="object-cover h-[calc(100%-60px)] w-full absolute top-0 left-0"
        />
        <nav className="w-full absolute bottom-0 left-0 -mt-1 bg-white">
          <ul className="flex heigh-[60px] justify-between p-2 ">
            {navMobile.map((nav: { id: string; title: string; icon: JSX.Element }) => (
              <li
                key={nav.id}
                onClick={handleChangeActive(nav.id)}
                className={`p-2 ${active === nav.id ? 'text-[#8e44ad]' : 'text-[#777]'} `}
              >
                <button className="flex flex-col items-center">
                  {nav.icon}
                  <span>{nav.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
