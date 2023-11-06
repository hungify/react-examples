import React from 'react';
import { DragContext } from './DragProvider';
import type { PolymorphicComponentPropWithRef } from '~/interfaces/react';
import type { DragType } from './shared';

type DropGuideProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      dropId: string;
      dropType: DragType;
    }
  >;

const DropGuide: React.FC<DropGuideProps<'div'>> = () => {
  const { drop, dragType } = React.useContext(DragContext);

  return dragType === 'card' && drop === 'list-1' ? (
    <div className='absolute inset-0 bg-blue-200 opacity-50' />
  ) : null;
};

DropGuide.displayName = 'DropGuide';

export default DropGuide;
