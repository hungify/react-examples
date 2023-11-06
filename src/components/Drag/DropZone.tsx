import React, { useContext } from 'react';

import type {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from '~/interfaces/react';
import { DragContext } from './DragProvider';

type DropZoneProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<
    C,
    {
      dropId: string;
      dropType: string;
      remember: boolean;
      style?: React.CSSProperties;
    }
  >;

const DropZone = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    props: DropZoneProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const { dragItem, dragType, setDrop, drop, onDrop } =
      useContext(DragContext);

    const { as, dropId, children, dropType, remember, style, ...restProps } =
      props;

    const Component = as || 'div';

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      return false;
    };

    const handleLeave = () => {
      if (!remember) {
        setDrop(null);
      }
    };

    return (
      <Component
        onDragEnter={() => dragItem && dropType === dragType && setDrop(dropId)}
        onDragOver={handleDragOver}
        onDrop={onDrop}
        style={{ position: 'relative', ...style }}
        ref={ref}
        {...restProps}
      >
        {children}
        {drop === dropId && (
          <div
            style={{ position: 'absolute', inset: '0px' }}
            onDragLeave={handleLeave}
          />
        )}
      </Component>
    );
  },
);

DropZone.displayName = 'DropZone';

export default DropZone;
