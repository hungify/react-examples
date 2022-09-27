import Expandable from './Expandable';
import { useState } from 'react';

const information = [
  {
    title: `Why shouldn't we trust atoms?`,
    text: 'They make up everything',
  },
  {
    title: 'What do you call someone with no body and no nose?',
    text: 'Nobody knows',
  },
  {
    title: `What's the object-oriented way to become wealthy?`,
    text: 'inheritance',
  },
];

export default function FAQCollapse() {
  const [activeIndex, setActiveIndex] = useState<number[] | undefined>([]);
  const handleExpand = (evt?: React.MouseEvent | boolean) => {
    if (evt && typeof evt !== 'boolean' && evt.target instanceof HTMLElement) {
      const index = Number(evt.target.dataset?.index);
      if (activeIndex && activeIndex.includes(index)) {
        setActiveIndex(activeIndex.filter((i) => i !== index));
      } else {
        setActiveIndex([...(activeIndex || []), index]);
      }
    }
  };
  return (
    <div className='mx-auto my-0 max-w-[600px]'>
      <h1 className='text-center font-medium'>Frequently Asked Questions</h1>
      {information?.map(({ title, text }, index) => (
        <Expandable
          shouldExpand={activeIndex?.indexOf(index) !== -1}
          onExpand={handleExpand}
          key={index}
          className={`${
            activeIndex?.indexOf(index) !== -1 ? 'Expandable-active' : ''
          }`}
        >
          <Expandable.Header>
            <h3>{title}</h3>
          </Expandable.Header>
          <Expandable.Icon data-index={index} />
          <Expandable.Body>{text}</Expandable.Body>
        </Expandable>
      ))}
    </div>
  );
}
