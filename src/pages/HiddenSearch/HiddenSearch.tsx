import 'pages/HiddenSearch/HiddenSearch.scss';
import { useRef, useState } from 'react';

export default function HiddenSearch() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [expanded, setExpanded] = useState(false);

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="search__wrapper">
      <div className="search__group">
        <input
          type="text"
          className={`search__input ${expanded && 'expanded'}`}
          placeholder="Search..."
          ref={inputRef}
          spellCheck={false}
        />
        <button className="search__btn" onClick={handleExpanded}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            height={40}
            width={40}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
