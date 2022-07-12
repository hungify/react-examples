import Expandable from 'pages/FAQCollapse/Expandable';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const information = [
  {
    header: 'Why everyone should live forever',
    note: 'This is highly sensitive information ... !!!!',
  },
  {
    header: 'The internet disappears',
    note: 'I just uncovered the biggest threat...',
  },
  {
    header: 'The truth about Elon musk and Mars!',
    note: 'Nobody tells you this...',
  },
];

export default function FAQCollapse() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const handleExpand = (evt?: React.MouseEvent | boolean) => {
    if (evt && typeof evt !== 'boolean' && evt.target instanceof HTMLElement) {
      const index = Number(evt.target.dataset?.index);
      setActiveIndex(index);
    }
  };
  return (
    <Wrapper>
      <h2>Frequently Asked Questions</h2>
      {information?.map(({ header, note }, index) => (
        <Expandable
          shouldExpand={index === activeIndex}
          onExpand={handleExpand}
          key={index}
          className={`${index === activeIndex ? 'Expandable-active' : ''}`}
        >
          <Expandable.Header>
            <h3>{header}</h3>
          </Expandable.Header>
          <Expandable.Icon data-index={index} />
          <Expandable.Body>{note}</Expandable.Body>
        </Expandable>
      ))}
    </Wrapper>
  );
}
